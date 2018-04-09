<template>
  <div class="row">
    <div class="col-9 q-pa-sm">
      <q-card v-if="selectedHomework">
        <q-card-title>{{selectedHomework.title}}</q-card-title>
        <q-card-main>
          <blockquote class="text-left">
            <small v-html="selectedHomework.detailHtml"></small>
          </blockquote>
          <q-tabs class="q-mt-sm" inverted color="secondary" v-if="selectedHomework.codeSnaps.length > 0" no-pane-border>
            <q-tab v-for="(cs,index) in selectedHomework.codeSnaps" :key="cs.id" :default="index==0" :name="cs.lang.name" :label="cs.lang.name" icon="code" slot="title" />
            <q-tab-pane v-for="cs in selectedHomework.codeSnaps" :key="cs.id" :name="cs.lang.name" class="text-left relative-position">
              <q-spinner-gears v-if="isShowLoader" color="teal-4" size="40px" class="absolute-center" />
              <q-btn color="purple-3" dense icon="content paste" class="absolute" style="right:25px;top:40px;" v-clipboard:copy="cs.codeSnap" v-clipboard:success="onSourceCodeCopy"></q-btn>
              <pre v-highlightjs="cs.codeSnap"><code v-bind:class="cs.lang.name"></code></pre>
            </q-tab-pane>
          </q-tabs>
        </q-card-main>
      </q-card>
      <q-card v-if="follower" class="q-mt-md">
        <q-card-title>私の回答</q-card-title>
        <q-card-main>
          <q-toolbar color="secondary">
            <q-btn v-if="editing" color="purple-3" size="sm" icon="code" class="q-mr-lg" @click="addCodeSnap">
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
            <q-btn size="sm" color="primary" v-if="!editing" @click="editing=true">編集</q-btn>
            <q-btn size="sm" icon="done" color="amber" v-if="editing" text-color="black" @click="commitFollower">実行</q-btn>
          </q-toolbar>
          <div class="row" v-if="editing">
            <div v-for="(cs,index) in follower.codeSnaps" :key="cs.uuidv4" class="relative-position q-px-xs" v-bind:class="{'col-12':showSourceAsList,'col-6':!showSourceAsList}">
              <q-select float-label="言語選択" v-model="cs.lang.id" :options="pgLanguageOpts" class="q-my-sm" @input="onPGLanguageChange(cs,$refs.cmObjs[index])" />
              <q-btn color="red-6" dense icon="delete forever" class="absolute" style="right:5px;top:15px;" @click="removeCodeSnap(index)"></q-btn>
              <codemirror ref="cmObjs" v-model="cs.codeSnap" :options="cs.options"></codemirror>
            </div>
          </div>

          <div class="row" v-if="!editing">
            <q-tabs class="q-mt-lg" style="width:100%;" inverted color="secondary" v-if="follower.codeSnaps.length > 0" no-pane-border>
              <q-tab v-for="(cs,index) in follower.codeSnaps" :key="cs.id" :default="index==0" :name="cs.lang.name" :label="cs.lang.name" icon="code" slot="title" />
              <q-tab-pane v-for="cs in follower.codeSnaps" :key="cs.id" :name="cs.lang.name" class="text-left relative-position">
                <q-btn color="purple-3" dense icon="content paste" class="absolute" style="right:25px;top:40px;" v-clipboard:copy="cs.codeSnap" v-clipboard:success="onSourceCodeCopy"></q-btn>
                <pre v-highlightjs="cs.codeSnap"><code style="min-height:200px;" v-bind:class="cs.lang.name"></code></pre>
              </q-tab-pane>
            </q-tabs>
          </div>
        </q-card-main>
      </q-card>
    </div>
    <div class="col-3 q-pa-sm">
      <q-list dark class="bg-tertiary" separator v-if="homeworks && homeworks.length > 0">
        <q-list-header>
          私の宿題
        </q-list-header>
        <q-item link v-for="hk in homeworks" :key="hk.id" @click.native="onHomeworkSelected(hk)">
          <q-item-main multiline>
            <q-item-tile label lines="1">{{hk.title}}</q-item-tile>
            <q-item-tile sublabel lines="3">
              <small>{{hk.detail}}</small>
            </q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { MasterService } from "../services/master.service";
import { FollowerService } from "../services/follower.service";
import { HomeworkService } from "../services/homework.service";
import ProgrammingLanguage from "../models/programming-language";
import Homework from "../models/homework";
import HomeworkCodeSnap from "../models/homework-codesnap";
import Follower from "../models/follower";
import FollowerCodeSnap from "../models/follower-codesnap";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      homeworks: [],
      // follower: null,
      isShowLoader: false,
      selectedHomework: null,
      showSourceAsList: true,
      editing: false
    };
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
      // 選択した宿題一覧を取得する
      HomeworkService.getHomeworkCodeSnaps(this.selectedHomework.id)
        .then(v => {
          this.selectedHomework.codeSnaps = v.map(d =>
            new HomeworkCodeSnap().deserialize(d)
          );
          this.closeTimer();
        })
        .catch(_ => this.closeTimer());

      // 宿題に対する回答内容を取得する
      this.$store.dispatch("follower/fetchFollowByUserAndHomeworkID", {
        userId: this.account.id,
        homeworkId: this.selectedHomework.id
      });
    },
    onPGLanguageChange(codeSnap, cmObj) {
      let selectedLang = this.pgLanguages.filter(
        v => v.id === codeSnap.lang.id
      )[0];
      codeSnap.lang.name = selectedLang.name;
      codeSnap.lang.codeMirrorName = selectedLang.codeMirrorName;
      codeSnap.lang.highlightName = selectedLang.highlightName;
      cmObj.options.mode = selectedLang.codeMirrorName;
      cmObj.options = cmObj.options;
    },
    async fetchMasterData() {
      this.$store.dispatch("master/fetchLanguge");
    },
    async fetchHomeworks() {
      let _homeworks = await FollowerService.getFollowedHomeworks();
      if (_homeworks) {
        this.homeworks = _homeworks.map(d => new Homework().deserialize(d));
      }
    },
    addCodeSnap() {
      console.log(this.follower);
      this.follower.addCodeSnap(new FollowerCodeSnap());
    },
    removeCodeSnap(index) {
      this.follower.codeSnaps.splice(index, 1);
    },
    commitFollower() {
      FollowerService.execute(this.follower).then(v => {
        if (v) {
          this.editing = false;
        }
      });
    },
    closeTimer() {
      setTimeout(() => {
        this.isShowLoader = false;
      }, 500);
    }
  },
  computed: {
    ...mapGetters({
      account: "account/account",
      pgLanguages: "master/pgLanguages",
      pgLanguageOpts: "master/pgLanguageOpts",
      follower: "follower/follower"
    })
  },
  mounted() {
    this.fetchMasterData();
    this.fetchHomeworks();
  }
};
</script>

<style lang="stylus">
</style>
