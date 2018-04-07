import FollowerCodeSnap from './follower-codesnap';

export default class Follower {
  constructor() {
    this.id = 0;
    this.ownerId = 0;
    this.homeworkId = 0;
    this.score = 0;
    this.commentFromTeacher = "";
    this.codeSnaps = [];
  }
  deserialize(input) {
    console.log(input)
    this.id = input.id;
    this.ownerId = input.ownerId;
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
}