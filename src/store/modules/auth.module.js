import { AuthService } from '../../services/auth.service';
import { DEF } from '../../defination';
import { CookieService } from '../../services/cookie.service';
import routes from '../../router'
const state = {
  email: "",
  password: "",
  loginFailed: false
}
const getters = {
  isLoginFailed: state => state.loginFailed
}
const mutations = {
  email(state, value) { state.email = value; },
  password(state, value) { state.password = value; }
}

const actions = {
  async signin(ctx) {
    ctx.state.loginFailed = false;
    const auth = await AuthService.signin(ctx.state.email, ctx.state.password).catch(err => {
      ctx.state.loginFailed = (err && err.code === DEF.Error.EmailOrPasswordInvalide);
      console.log(ctx.state.loginFailed);
    });
    if (auth) {
      CookieService.setAuthToken(auth.authToken);
      if (auth.isFirstTimeLogin) {
        routes.push("/change-password");
      } else {
        routes.push("/");
      }
    }
  },
  async signout(ctx) {
    const result = await AuthService.signout();
    if (result) {
      CookieService.deleteAuthToken();
      routes.push("/signin");
    }
  }
}

export const AuthModule = {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
}