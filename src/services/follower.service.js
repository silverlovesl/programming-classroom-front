import { API } from './api.service'
export const FollowerService = {
  followHomework(homeworkID) {
    return API.post(`/follow-homework/${homeworkID}`, {}).then(v => v.data);
  },
  getFollowedHomeworks() {
    return API.get(`/followed-homeworks`, {}).then(v => v.data);
  },
  getFollowerByHomeworkID(homeworkID) {
    return API.get(`/follower/${homeworkID}`, {}).then(v => v.data);
  },
  execute(follower) {
    return API.post(`/follower-execute`, follower).then(v => v.data);
  }
}