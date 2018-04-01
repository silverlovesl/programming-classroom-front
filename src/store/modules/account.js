import { AccountService } from '../../services/account.service';
import Account from '../../models/account'
const state = {
  account: new Account()
}
const getters = {
  account: state => state.account
}

const mutations = {
  account(state, account) { state.account = new Account().deserialize(account); }
}

const actions = {
  // 
  async fetchAuthAccount(ctx) {
    const account = await AccountService.getAuthAccount();
    if (account) {
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