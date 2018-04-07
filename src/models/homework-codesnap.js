import ProgrammingLanguage from './programming-language';
import uuidv4 from 'uuid/v4';
export default class HomeworkCodeSnap {
  constructor() {
    this.uuid = uuidv4();
    this.id = 0;
    this.homeworkId = 0;
    this.lang = new ProgrammingLanguage();
    this.codeSnap = "";
    this.createdAt = null;
    this.options = {
      tabSize: 4,
      styleActiveLine: true,
      lineNumbers: true,
      line: true,
      mode: "text/x-c++src",
      lineWrapping: false,
      theme: "monokai",
      keyMap: "sublime",
      styleSelectedText: false
    }
  }
  deserialize(input) {
    this.id = input.id;
    this.homeworkId = input.homeworkId;
    this.lang = new ProgrammingLanguage().deserialize(input.lang);
    this.codeSnap = input.codeSnap;
    return this;
  }
}
