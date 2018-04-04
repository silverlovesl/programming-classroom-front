import ProgrammingLanguage from './programming-language';

export default class HomeworkCodeSnap {
  constructor() {
    this.id = 0;
    this.homeworkId = 0;
    this.lang = new ProgrammingLanguage();
    this.codeSnap = "";
    this.createdAt = null;
  }
  deserialize(input) {
    this.id = input.id;
    this.homeworkId = input.homeworkId;
    this.lang = new ProgrammingLanguage().deserialize(input.lang);
    this.codeSnap = input.codeSnap;
    return this;
  }
}
