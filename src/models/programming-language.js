export default class ProgrammingLanguage {
  constructor() {
    this.id = 1;
    this.name = "";
    this.codeMirrorName = "";
    this.highlightName = "";
  }
  deserialize(input) {
    this.id = input.id;
    this.name = input.name;
    this.codeMirrorName = input.codeMirrorName;
    this.highlightName = input.highlightName;
    return this;
  }
}
