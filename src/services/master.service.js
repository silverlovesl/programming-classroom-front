import { API } from './api.service'

export const MasterService = {
  getProgrammingLanguages() {
    return API.get("/programming-languages", {}).then(v => v.data.data);
  }
}
