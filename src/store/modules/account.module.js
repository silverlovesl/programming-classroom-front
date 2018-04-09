import { AccountService } from '../../services/account.service';
import Account from '../../models/account'
const state = {
  account: new Account(),
  authError: false,
  existsEmail: false
}
const getters = {
  account: state => state.account,
  authError: state => state.authError,
  existsEmail: state => state.existsEmail
}

const mutations = {
  account(state, data) { state.account = new Account().deserialize(data); },
  authError(state, isInvalid) { state.authError = isInvalid },
  existsEmail(state, data) { state.existsEmail = data }
}

const actions = {
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
  async checkExistsEmail(ctx) {
    ctx.commit("existsEmail", false);
    console.log(ctx);
    const result = await AccountService.checkExistsEmail(ctx.state.account.email);
    console.log(result);
    if (result) {
      ctx.commit("existsEmail", true);
    }
  },

  addAccount(ctx, data) {
    AccountService.addAccount(data);
  },

  updateAccount(ctx, data) {
    AccountService.updateAccount(data);
  }
}

export const AccountModule = {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
}