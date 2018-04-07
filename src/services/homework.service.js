import { API } from './api.service'
export const HomeworkService = {
  getHomework(homeworkID) {
    return API.get(`/homework/${homeworkID}`, {}).then(v => v.data);
  },
  getHomeworks() {
    return API.get("/homeworks", {}).then(v => v.data.data);
  },

  getHomeworkCodeSnaps(homeworkID) {
    return API.get(`/homework-codesnap/${homeworkID}`, {}).then(v => v.data.data);
  },

  addHomework(homework) {
    return API.post("/homework", homework).then(v => v.data);
  },

  updateHomework(homework) {
    return API.put("/homework", homework).then(v => v.data);
  }
}