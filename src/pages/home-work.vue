<template>
  <article>
    Homework
    <div class="row">
      <div class="col-4">
        <codemirror v-model="exampleCode" :options="cmOption"></codemirror>
      </div>
    </div>
  </article>
</template>
<script>
// import "codemirror/addon/selection/active-line.js";

export default {
  data() {
    return {
      exampleCode: "const a = 2121210",
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
