<template>
  <article>
    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn round color="secondary" @click="addHomework" icon="add" />
    </q-page-sticky>
    <div class="row">
      <div class="col-4">
        <codemirror v-model="exampleCode" :options="cmOption"></codemirror>
      </div>
    </div>
    <q-modal v-model="opened" :content-css="{minWidth: '90vw', minHeight: '90vh'}" :no-backdrop-dismiss="true" :no-esc-dismiss="true">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            宿題作成
          </q-toolbar-title>
          <q-btn color="purple-3" size="sm" round icon="code" class="q-mr-lg">
            <q-tooltip anchor="bottom right" self="top left">問題ソースコードを追加</q-tooltip>
          </q-btn>
          <q-btn color="red-6" size="sm" round icon="power settings new" @click="closeHomework">
            <q-tooltip anchor="bottom right" self="top left">閉じる</q-tooltip>
          </q-btn>
        </q-toolbar>
        <div class="row">
          <div class="col-12 q-px-lg q-py-sm">
            <q-field>
              <q-input value="宿題概要の記載、例：ソート問題" color="secondary" float-label="宿題名*" maxlength="200" clearable></q-input>
            </q-field>
          </div>
        </div>
        <div class="row">
          <div class="col-12 q-px-lg q-py-sm">
            <q-input value="宿題の詳細を記載する" rows="3" color="secondary" type="textarea" float-label="詳細*" />
          </div>
        </div>
        <div class="row">
          <div class="col-12 q-px-lg q-py-sm">

          </div>
        </div>
      </q-modal-layout>
    </q-modal>
  </article>
</template>
<script>
// import "codemirror/addon/selection/active-line.js";

export default {
  data() {
    return {
      opened: false,
      exampleCode: "",
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/x-c++src",
        lineWrapping: true,
        theme: "monokai",
        keyMap: "sublime",
        styleSelectedText: false
      }
    };
  },
  methods: {
    addHomework() {
      this.opened = true;
    },
    closeHomework() {
      this.opened = false;
    }
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
