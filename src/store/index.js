import Vue from 'vue'
import Vuex from 'vuex'
import { AuthModule } from './modules/auth.module';
import { AccountModule } from './modules/account.module';
import { HomeworkModule } from './modules/homework.module';
import { MasterModule } from './modules/master.module';
import { FollowerModule } from './modules/follower.module';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: AuthModule,
    account: AccountModule,
    homework: HomeworkModule,
    follower: FollowerModule,
    master: MasterModule
  }
})

export default store
