import { AuthService } from '../../services/auth.service';
import { DEF } from '../../defination';
import { CookieService } from '../../services/cookie.service';
import { FollowerService } from '../../services/follower.service';
import routes from '../../router'
import Follower from '../../models/follower';
const state = {
  follower: null,
  followers: []
}
const getters = {
  follower: state => state.follower,
  followers: state => state.followers
}
const mutations = {
  follower(state, data) { state.follower = new Follower().deserialize(data); },
  followers(state, data) { state.followers = data.map(d => new Follower().deserialize(d)); }
}

const actions = {
  async fetchFollowByUserAndHomeworkID(ctx, condition) {
    // 宿題に対する回答内容を取得する
    let follower = await FollowerService.getFollowerByHomeworkID(condition.userId, condition.homeworkId);
    if (follower) {
      ctx.commit("follower", follower);
    }
  },
  async fetchFollowersByHomeworkID(ctx, condition) {
    // 宿題に対する回答内容を取得する
    let followers = await FollowerService.getFollowersByHomeworkID(condition.homeworkId);
    if (followers) {
      ctx.commit("followers", followers);
    }
  },
  async updateScore(ctx, condition) {
    // 宿題に対する回答内容を取得する
    let result = await FollowerService.updateScore(condition);
    if (result) {
      ctx.dispatch("fetchFollowersByHomeworkID", { homeworkId: result.homeworkId });
      ctx.commit("follower", null);
    }
  }
}

export const FollowerModule = {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
}