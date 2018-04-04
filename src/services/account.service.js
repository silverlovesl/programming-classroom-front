import { API } from './api.service'
export const AccountService = {
  getAuthAccount() {
    return API.get("/auth-account", {}).then(v => v.data);
  },

  getAccounts() {
    return API.get("/accounts", {}).then(v => v.data);
  },

  getAccount(userId) {
    return API.get(`/account/${userId}`, {}).then(v => v.data);
  },

  addAccount(data) {
    return API.post("/account", data).then(v => v.data);
  }
}
