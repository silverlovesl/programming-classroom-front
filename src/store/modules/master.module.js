import { DEF } from '../../defination';
import { MasterService } from "../../services/master.service";
import { CookieService } from '../../services/cookie.service';
import ProgrammingLanguage from "../../models/programming-language";
import routes from '../../router'
const state = {
  pgLanguages: []
}
const getters = {
  pgLanguages: state => state.pgLanguages,
  pgLanguageOpts: state => state.pgLanguages.map(d => { return { label: d.name, value: d.id }; })
}
const mutations = {
  pgLanguages(state, data) { state.pgLanguages = data.map(d => new ProgrammingLanguage().deserialize(d)) }
}

const actions = {
  async fetchLanguge(ctx) {
    //Master データ取得
    const pgLanguages = await MasterService.getProgrammingLanguages()
    if (pgLanguages) {
      ctx.commit("pgLanguages", pgLanguages);
    }
  }
}

export const MasterModule = {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
}