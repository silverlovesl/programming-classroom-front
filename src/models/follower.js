import Account from "./account";
import FollowerCodeSnap from './follower-codesnap';

export default class Follower {
  constructor(owner) {
    this.id = 0;
    this.owner = owner;
    this.homeworkId = 0;
    this.status = 0;
    this.score = 0;
    this.commentFromTeacher = "";
    this.codeSnaps = [];
  }
  deserialize(input) {
    if (!input) {
      return null;
    }
    this.id = input.id;
    this.status = input.status;
    if (input.owner) {
      this.owner = new Account().deserialize(input.owner);
    }
    this.homeworkId = input.homeworkId;
    this.score = input.score;
    this.commentFromTeacher = input.commentFromTeacher;
    if (input.codeSnaps) {
      this.codeSnaps = input.codeSnaps.map(d => new FollowerCodeSnap().deserialize(d));
    }
    return this;
  }

  addCodeSnap(codeSnap) {
    this.codeSnaps = [...this.codeSnaps, codeSnap];
  }

  get hasAnswered() {
    return this.status > 1;
  }

  get statusOption() {
    let color = ""
    let tooltip = ""
    switch (this.status) {
      case 0:
        color = "";
        tooltip = "";
        break;
      case 1:
        color = "";
        tooltip = "未回答";
        break;
      case 2:
        color = "warning";
        tooltip = "回答済";
        break;
      case 3:
        color = "positive";
        tooltip = "採点済";
        break;
    }
    return {
      color: color,
      tooltip: tooltip
    }
  }
}