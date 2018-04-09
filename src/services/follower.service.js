import { API } from './api.service'
export const FollowerService = {
  //宿題をフォローする
  followHomework(homeworkId) {
    return API.post(`/follow-homework/${homeworkId}`, {}).then(v => v.data);
  },
  //ログインユーザーがフォローした宿題一覧を取得する
  getFollowedHomeworks() {
    return API.get(`/followed-homeworks`, {}).then(v => v.data);
  },
  //宿題IDにより、フォローしたログインユーザーを取得する
  getFollowerByHomeworkID(userId, homeworkId) {
    return API.get(`/follower?userId=${userId}&homeworkId=${homeworkId}`).then(v => v.data);
  },
  //宿題IDにより、フォローした全ユーザーを取得する
  getFollowersByHomeworkID(homeworkId) {
    return API.get(`/followers/${homeworkId}`, {}).then(v => v.data);
  },
  //宿題を回答する
  execute(follower) {
    return API.post(`/follower-execute`, follower).then(v => v.data);
  },
  //先生からの評価する
  updateScore(follower) {
    return API.put(`/follower-score`, follower).then(v => v.data);
  }
}