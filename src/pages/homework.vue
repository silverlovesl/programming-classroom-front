<template>
  <article>
    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn round color="secondary" @click="addHomework" icon="add" />
    </q-page-sticky>
    <div class="row">
      <div class="col-4">
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
            <q-field>
              <q-input v-model="homework.title" color="secondary" float-label="宿題名*" maxlength="200" clearable></q-input>
            </q-field>
          </div>
        </div>
        <div class="row">
          <div class="col-12 q-px-lg q-py-sm">
            <q-input v-model="homework.detail" rows="3" color="secondary" type="textarea" float-label="詳細*" />
          </div>
        </div>
        <q-toolbar color="secondary">
          <q-btn color="purple-3" size="sm" round icon="code" class="q-mr-lg" @click="addCodeSnap">
            <q-tooltip anchor="bottom right" self="top left">問題ソースコードを追加</q-tooltip>
          </q-btn>
          難易度:
          <q-rating v-model="homework.ranking" :max="10" />
        </q-toolbar>
        <div row v-for="(codeSnap,index) in homework.codeSnaps" :key="codeSnap.id">
          <div class="col-12 q-px-lg q-py-sm">
            <q-select v-model="codeSnap.lang.id" :options="pgLanguageOpts" class="q-my-sm" @input="onPGLanguageChange(codeSnap,$refs.cmObjs[index])" />
            <codemirror ref="cmObjs" v-model="codeSnap.codeSnap" :options="cmOption"></codemirror>
          </div>
        </div>
      </q-modal-layout>
    </q-modal>
  </article>
</template>
<script>
// import "codemirror/addon/selection/active-line.js";
import Homework from "../models/homework";
import HomeworkCodeSnap from "../models/homework-codesnap";
import ProgrammingLanguage from "../models/programming-language";
import { MasterService } from "../services/master.service";

export default {
  data() {
    return {
      pgLanguageOpts: null,
      pgLanguages: null,
      homeworks: [],
      homework: null,
      opened: false,
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/x-pgsql",
        lineWrapping: true,
        theme: "monokai",
        keyMap: "sublime",
        styleSelectedText: false
      }
    };
  },
  methods: {
    onPGLanguageChange(codeSnap, cmObj) {
      console.log(codeSnap.lang.id);
      let selectedLang = this.pgLanguages.filter(
        v => v.id === codeSnap.lang.id
      )[0];
      // this.cmOption.mode = selectedLang.codeMirrorName;
      // console.log(cmObj);
      cmObj.mode = selectedLang.codeMirrorName;
    },
    addHomework() {
      this.opened = true;
      this.homework = new Homework(this.$store.getters["account/account"]);
    },
    closeHomework() {
      this.opened = false;
    },
    addCodeSnap() {
      this.homework.addCodeSnap(new HomeworkCodeSnap());
    },
    fetchMasterData() {
      MasterService.getProgrammingLanguages().then(v => {
        this.pgLanguages = v.data.map(d =>
          new ProgrammingLanguage().deserialize(d)
        );
        this.pgLanguageOpts = this.pgLanguages.map(d => {
          return { label: d.name, value: d.id };
        });
      });
    }
  },
  mounted() {
    this.fetchMasterData();
  }
};
</script>
<style lang="stylus">
.CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: Monaco, sans-serif, Arial !important;
  height: 300px;
  font-size: 14px !important;
}
</style>
