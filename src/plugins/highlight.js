import VueHighlightJS from 'vue-highlightjs';
import 'highlight.js/styles/monokai-sublime.css';

export default ({ app, Vue }) => {
  Vue.use(VueHighlightJS);
}
