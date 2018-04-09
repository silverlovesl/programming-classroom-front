<template>
  <article>
    <div class="row">
      <div class="col-3 q-pa-sm">
        <q-toolbar v-if="account.isTeacher" color="secondary">
          <q-btn color="purple-3" @click="addHomework" icon="add">新規</q-btn>
        </q-toolbar>
        <q-scroll-area style="width: 100%;height: 600px;">
          <q-list highlight separator v-if="homeworks && homeworks.length > 0">
            <q-list-header>
              宿題一覧
            </q-list-header>
            <q-item link v-for="hk in homeworks" :key="hk.id">
              <q-item-main multiline @click.native="onHomeworkSelected(hk)">
                <q-item-tile label lines="1">{{hk.title}}</q-item-tile>
                <q-item-tile sublabel lines="3">
                  <small>{{hk.detail}}</small>
                </q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-item-tile stamp>{{hk.createdAt | moment('MM/DD HH:mm')}}</q-item-tile>
                <q-btn v-if="account.isTeacher" color="pink" dense size="sm" icon="border color" @click="updateHomework(hk.id)">
                  <q-tooltip anchor="bottom right" self="top left">変更</q-tooltip>
                </q-btn>
                <q-icon name="favorite" v-if="account.isStudent && hk.hasNotFollowed" @click.native="followHomework(hk)">
                  <q-tooltip anchor="bottom right" self="top left">フォローする</q-tooltip>
                </q-icon>
                <q-icon name="favorite" color="red" v-if="account.isStudent && !hk.hasNotFollowed">
                  <q-tooltip anchor="bottom right" self="top left">フォロー済</q-tooltip>
                </q-icon>
              </q-item-side>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
      <div v-if="selectedHomework" class="col-9 q-pa-sm text-center">
        <small>{{selectedHomework.title}}</small>
        <blockquote class="text-left">
          <small v-html="selectedHomework.detailHtml"></small>
        </blockquote>
        <q-tabs class="q-mt-sm" inverted color="secondary" v-if="selectedHomework.codeSnaps.length > 0" no-pane-border>
          <q-tab v-for="(cs,index) in selectedHomework.codeSnaps" :key="cs.id" :default="index==0" :name="cs.lang.name" :label="cs.lang.name" icon="code" slot="title" />
          <q-tab-pane v-for="cs in selectedHomework.codeSnaps" :key="cs.id" :name="cs.lang.name" class="text-left relative-position">
            <q-spinner-gears v-if="isShowLoader" color="teal-4" size="40px" class="absolute-center" />
            <q-btn color="purple-3" dense icon="content paste" class="absolute" style="right:25px;top:40px;" v-clipboard:copy="cs.codeSnap" v-clipboard:success="onSourceCodeCopy"></q-btn>
            <pre v-highlightjs="cs.codeSnap"><code style="min-height:300px;" v-bind:class="cs.lang.name"></code></pre>
          </q-tab-pane>
        </q-tabs>
        <div class="row text-left" v-if="account.isTeacher">
          <div class="col-12">
            <q-chip v-for="fw in followers" :key="fw.id" :color="fw.statusOption.color" class="q-ml-md follower-chip" @click.native="followerSelected(fw)">
              {{fw.owner.name}}
              <q-tooltip anchor="bottom right" self="top left">{{fw.statusOption.tooltip}}</q-tooltip>
            </q-chip>
          </div>
          <div v-if="follower" class="col-12 q-pa-sm">
            <q-card v-if="!follower.hasAnswered">
              <q-card-main>
                <q-card-title>未回答</q-card-title>
              </q-card-main>
            </q-card>
            <q-card v-if="follower.hasAnswered">
              <q-card-main>
                <q-card-title v-if="follower.hasAnswered">{{follower.owner.name}}の回答</q-card-title>
                <q-tabs v-if="follower.hasAnswered && follower.codeSnaps.length > 0" style="width:100%;" inverted color="secondary" no-pane-border>
                  <q-tab v-for="(cs,index) in follower.codeSnaps" :key="cs.id" :default="index==0" :name="cs.lang.name" :label="cs.lang.name" icon="code" slot="title" />
                  <q-tab-pane v-for="cs in follower.codeSnaps" :key="cs.id" :name="cs.lang.name" class="text-left relative-position">
                    <pre v-highlightjs="cs.codeSnap"><code style="min-height:200px;" v-bind:class="cs.lang.name"></code></pre>
                  </q-tab-pane>
                </q-tabs>
                <q-list>
                  <q-item>
                    <q-item-side>採点</q-item-side>
                    <q-item-main>
                      <q-slider v-model="follower.score" :min="0" :max="100" :step="1" label-always snap />
                    </q-item-main>
                  </q-item>
                  <q-item-separator />
                  <q-item>
                    <q-item-main>
                      <q-input v-model="follower.commentFromTeacher" rows="4" color="secondary" type="textarea" float-label="先生からの評価" />
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-card-main>
              <q-card-separator />
              <q-card-actions>
                <q-btn flat color="primary" label="コミット" @click="commitTeacherComment(follower)" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <q-modal v-if="homework" v-model="opened" :content-css="{minWidth: '90vw', minHeight: '90vh'}" :no-backdrop-dismiss="true" :no-esc-dismiss="true">
      <q-modal-layout name="homework">
        <q-toolbar slot="header">
          <q-toolbar-title>
            宿題作成
          </q-toolbar-title>
          <q-btn color="red-6" size="sm" round icon="power settings new" @click="closeHomework">
            <q-tooltip anchor="bottom right" self="top left">閉じる</q-tooltip>
          </q-btn>
        </q-toolbar>
        <div class="row">
          <div class="col-12 q-px-lg q-py-sm">
            <q-field :error="$v.homework.title.$error">
              <q-input v-model="homework.title" @blur="$v.homework.title.$touch" color="secondary" float-label="宿題名*" maxlength="200" clearable></q-input>
            </q-field>
          </div>
        </div>
        <div class="row">
          <div class="col-12 q-px-lg q-py-sm">
            <q-field :error="$v.homework.detail.$error">
              <q-input v-model="homework.detail" @blur="$v.homework.detail.$touch" rows="3" color="secondary" type="textarea" float-label="詳細*" />
            </q-field>
          </div>
        </div>
        <q-toolbar color="secondary">
          難易度:
          <q-rating v-model="homework.ranking" :max="10" class="q-mr-lg" />
          <q-btn color="purple-3" size="sm" icon="code" class="q-mr-lg" @click="addCodeSnap">
            <q-tooltip anchor="bottom right" self="top left">ソースコード追加</q-tooltip>
          </q-btn>
          <q-btn-group class="q-mr-lg">
            <q-btn icon="view list" color="primary" size="sm" @click="showSourceAsList=true">
              <q-tooltip anchor="bottom right" self="top left">一覧表示</q-tooltip>
            </q-btn>
            <q-btn icon="view module" color="primary" size="sm" @click="showSourceAsList=false">
              <q-tooltip anchor="bottom right" self="top left">ブロック表示</q-tooltip>
            </q-btn>
          </q-btn-group>
          <q-btn size="sm" icon="done" color="amber" text-color="black" :disabled="$v.$invalid" @click="commitAddHomework">実行</q-btn>
        </q-toolbar>
        <div class="row">
          <div v-for="(codeSnap,index) in homework.codeSnaps" :key="codeSnap.uuidv4" class="q-px-lg q-py-sm relative-position" v-bind:class="{'col-12':showSourceAsList,'col-6':!showSourceAsList}">
            <q-select float-label="言語選択" v-model="codeSnap.lang.id" :options="pgLanguageOpts" class="q-my-sm" @input="onPGLanguageChange(codeSnap,$refs.cmObjs[index])" />
            <q-btn color="red-6" dense icon="delete forever" class="absolute" style="right:25px;top:25px;" @click="removeCodeSnap(index)"></q-btn>
            <codemirror ref="cmObjs" v-model="codeSnap.codeSnap" :options="codeSnap.options"></codemirror>
          </div>
        </div>
      </q-modal-layout>
    </q-modal>
  </article>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import Homework from "../models/homework";
import HomeworkCodeSnap from "../models/homework-codesnap";
import Follower from "../models/follower";
import ProgrammingLanguage from "../models/programming-language";
import { MasterService } from "../services/master.service";
import { HomeworkService } from "../services/homework.service";
import { FollowerService } from "../services/follower.service";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      editMode: 0,
      isShowLoader: false,
      showSourceAsList: true,
      homeworks: [],
      homework: null,
      selectedFollower: null,
      selectedHomework: null,
      opened: false
    };
  },
  validations: {
    homework: {
      title: { required },
      detail: { required }
    }
  },
  methods: {
    onSourceCodeCopy() {
      this.$q.notify({
        color: "secondary",
        message: "ソースコードをコピーしました。"
      });
    },
    onHomeworkSelected(hk) {
      this.selectedHomework = hk;
      this.isShowLoader = true;
      this.$store.commit("follower/follower", null);
      HomeworkService.getHomeworkCodeSnaps(this.selectedHomework.id)
        .then(v => {
          this.selectedHomework.codeSnaps = v.map(d =>
            new HomeworkCodeSnap().deserialize(d)
          );
          this.$store.dispatch("follower/fetchFollowersByHomeworkID", {
            homeworkId: this.selectedHomework.id
          });
          this.closeTimer();
        })
        .catch(_ => this.closeTimer());
    },
    onPGLanguageChange(codeSnap, cmObj) {
      let selectedLang = this.pgLanguages.filter(
        v => v.id === codeSnap.lang.id
      )[0];
      codeSnap.lang.codeMirrorName = selectedLang.codeMirrorName;
      codeSnap.lang.highlightName = selectedLang.highlightName;
      cmObj.options.mode = selectedLang.codeMirrorName;
      cmObj.options = cmObj.options;
    },
    addHomework() {
      this.editMode = 1;
      this.opened = true;
      this.homework = new Homework(this.account);
    },
    updateHomework(homeworkId) {
      this.editMode = 2;
      HomeworkService.getHomework(homeworkId).then(v => {
        this.homework = new Homework().deserialize(v);
        this.opened = true;
      });
    },
    async followHomework(homework) {
      let follower = await FollowerService.followHomework(homework.id);
      if (follower) {
        homework.status = follower.status;
      }
    },
    closeHomework() {
      this.editMode = 0;
      this.opened = false;
      this.homework = null;
    },
    addCodeSnap() {
      this.homework.addCodeSnap(new HomeworkCodeSnap());
    },
    removeCodeSnap(index) {
      this.homework.codeSnaps.splice(index, 1);
    },
    async fetchMasterData() {
      this.$store.dispatch("master/fetchLanguge");
    },
    async fetchHomeworks() {
      let _homeworks = await HomeworkService.getHomeworks();
      if (_homeworks) {
        this.homeworks = _homeworks.map(d => new Homework().deserialize(d));
      }
    },
    async commitAddHomework() {
      let result;
      if (this.isModeUpdate) {
        result = await HomeworkService.updateHomework(this.homework);
      } else {
        result = await HomeworkService.addHomework(this.homework);
      }
      if (result) {
        this.closeHomework();
        this.fetchHomeworks();
      }
    },
    followerSelected(fw) {
      console.log(fw);
      this.$store.dispatch("follower/fetchFollowByUserAndHomeworkID", {
        userId: fw.owner.id,
        homeworkId: fw.homeworkId
      });
    },
    closeTimer() {
      setTimeout(() => {
        this.isShowLoader = false;
      }, 500);
    },
    commitTeacherComment(follower) {
      this.$store.commit("follower/follower", follower);
      this.$store.dispatch("follower/updateScore", follower);
    }
  },
  computed: {
    ...mapGetters({
      account: "account/account",
      pgLanguages: "master/pgLanguages",
      pgLanguageOpts: "master/pgLanguageOpts",
      follower: "follower/follower",
      followers: "follower/followers"
    }),
    isModeInsert() {
      return this.editMode === 1;
    },
    isModeUpdate() {
      return this.editMode === 2;
    }
  },
  mounted() {
    this.fetchMasterData();
    this.fetchHomeworks();
  }
};
</script>
<style lang="stylus">
.CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: Monaco, sans-serif, Arial !important;
  height: 300px;
  font-size: 12px !important;
}

code {
  font-size: 14px !important;
}

.follower-chip {
  cursor: pointer;
}
</style>
