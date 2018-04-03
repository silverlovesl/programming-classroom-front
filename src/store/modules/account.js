import { AccountService } from '../../services/account.service';
import Account from '../../models/account'
const state = {
  account: new Account(),
  authError: false
}
const getters = {
  account: state => state.account,
  authError: state => state.authError
}

const mutations = {
  account(state, account) { state.account = new Account().deserialize(account); },
  authError(state, isInvalid) { state.authError = isInvalid }
}

const actions = {
  // 
  async fetchAuthAccount(ctx) {
    const account = await AccountService.getAuthAccount().catch(err => {
      //認証失敗時
      console.log(err);
      if (err && err.code === -1) {
        ctx.commit("authError", true);
      }
    })

    if (account) {
      ctx.commit("authError", false);
      ctx.commit("account", account);
    }
  },

  addAccount(ctx, data) {
    AccountService.addAccount(data);
  }
}

export const AccountModule = {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
}