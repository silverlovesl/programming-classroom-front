import moment from 'moment';
export default class Account {
  constructor() {
    this.id = 0;
    this.companyId = 0;
    this.name = "";
    this.email = "";
    this.role = -1;
    this.gender = true;
    this.birthday = null;
    this.nation = -1;
    this.nickName = null;
    this.avaterUrl = null;
    this.joinDate = null;
  }
  deserialize(input) {
    this.id = input.id;
    this.companyId = input.companyId;
    this.name = input.name;
    this.email = input.email;
    this.role = input.role;
    this.gender = input.gender;
    if (input.birthday) {
      this.birthday = new Date(input.birthday);
    }
    if (input.joinDate) {
      this.joinDate = new Date(input.joinDate);
    }
    this.nation = input.nation;
    this.nickName = input.nickName;
    this.avaterUrl = input.avaterUrl;
    return this;
  }
  get roleName() {
    switch (this.role) {
      case 0: return "学員";
      case 1: return "教師";
      default: return "不明";
    }
  }
  get nationName() {
    switch (this.nation) {
      case 0: return "中国";
      case 1: return "日本";
      default: return "不明";
    }
  }

  get genderName() {
    return this.gender ? "男" : "女";
  }

  get isTeacher() {
    return this.role === 1;
  }

  get joinDateStr() {
    if (this.joinDate) {
      return moment(this.joinDate).format("YYYY-MM-DD");
    }
    return "";
  }
}