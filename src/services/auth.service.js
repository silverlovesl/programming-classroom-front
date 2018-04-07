import { API } from './api.service'
export const AuthService = {
  signin(email, password) {
    return API.post("/signin", { email: email, password: password }).then(v => v.data);
  },

  signout() {
    return API.post("/signout", {}).then(v => v.data);
  },

  changePassword(password) {
    return API.post(`/change-password`, { password: password }).then(v => v.data);
  }
}