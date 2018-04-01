import Vue from 'vue'
import Vuex from 'vuex'
import { AuthModule } from './modules/auth';
import { AccountModule } from './modules/account';
import { HomeworkModule } from './modules/homework';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: AuthModule,
    account: AccountModule,
    homework: HomeworkModule
  }
})

export default store
