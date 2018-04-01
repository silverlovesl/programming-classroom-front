import Account from "./account";

export default class Homework {
  constructor() {
    this.id = 0;
    this.companyId = 0;
    this.owner;
    this.title = "";
    this.lang = 0;
    this.ranking = 0;
    this.codeSpan;
    this.answer;
    this.createAt;
  }
  deserialize(input) {
    this.id = input.id;
    this.companyId = input.companyId;
    this.owner = new Account().deserialize(input.owner);
    this.title = input.title;
    this.lang = input.lang;
    this.ranking = input.ranking;
    this.codeSpan = input.codeSpan;
    this.answer = input.answer;
    if (input.createAt) {
      this.createAt = new Date(input.createAt);
    }
    return this;
  }
}