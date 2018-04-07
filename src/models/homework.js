import Account from "./account";
import HomeworkCodeSnap from "./homework-codesnap";
export default class Homework {
  constructor(owner) {
    this.id = 0;
    this.companyId = 0;
    this.owner = owner;
    this.title = "宿題概要の記載、例：ソート問題";
    this.detail = "宿題の詳細を記載する";
    this.ranking = 0;
    this.status = 0;
    this.codeSnaps = [];
    this.answer = "";
    this.createdAt = null;
  }
  deserialize(input) {
    this.id = input.id;
    this.companyId = input.companyId;
    this.owner = new Account().deserialize(input.owner);
    this.title = input.title;
    this.detail = input.detail;
    this.ranking = input.ranking;
    this.status = input.status;
    if (input.codeSnaps) {
      this.codeSnaps = input.codeSnaps.map(d => new HomeworkCodeSnap().deserialize(d));
    }
    this.answer = input.answer;
    if (input.createdAt) {
      this.createdAt = new Date(input.createdAt);
    }

    return this;
  }

  addCodeSnap(codeSnap) {
    this.codeSnaps = [...this.codeSnaps, codeSnap];
  }

  get detailHtml() {
    if (this.detail) {
      return this.detail.replace(/\n/g, "<br />");
    }
    return "";
  }
  get hasNotFollowed() {
    return this.status == 0;
  }
}
