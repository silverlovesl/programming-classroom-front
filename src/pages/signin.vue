<template>
  <div class="my-background">
    <vue-particles color="#ffffff" :particleOpacity="0.7" linesColor="#ffffff" :particlesNumber="80" shapeType="circle" :particleSize="5" :linesWidth="2" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <div class="fixed-center text-center">
      <q-card class="login-area">
        <q-card-media>
          <img src="~assets/login-page.png" class="login-page-img">
        </q-card-media>
        <q-card-title>
          Login
        </q-card-title>
        <q-list>
          <q-item>
            <q-item-main>
              <q-field icon="mail" :error="$v.loginForm.email.$error">
                <q-input v-model="loginForm.email" type="text" @blur="$v.loginForm.email.$touch" stack-label="Email" clearable />
              </q-field>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-field icon="lock" :error="$v.loginForm.password.$error">
                <q-input v-model="loginForm.password" @keyup.enter="signin" type="password" @blur="$v.loginForm.password.$touch" float-label="Password" clearable />
              </q-field>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main class="text-center">
              <span class="text-red" v-if="isLoginFailed">メールアドレス or パスワードが不正</span>
            </q-item-main>
          </q-item>
        </q-list>
        <q-card-separator />
        <q-card-actions align="end">
          <q-btn color="secondary" :disabled="$v.$invalid" @click="signin">Login</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        email: null,
        password: null
      }
    };
  },
  validations: {
    loginForm: {
      email: { required },
      password: { required }
    }
  },
  methods: {
    signin() {
      this.$store.commit("auth/email", this.loginForm.email);
      this.$store.commit("auth/password", this.loginForm.password);
      this.$store.dispatch("auth/signin");
    }
  },
  computed: {
    ...mapGetters({ isLoginFailed: "auth/isLoginFailed" })
  }
};
</script>

<style lang="stylus">
.login-area {
  width: 500px;
  background-color: white;
}

.my-background {
  // position: fixed;
  // top: 0;
  // left: 0;
  background-color: RGBA(45, 161, 237, 1);
  width: 100%;
  height: 100vh;
}
</style>
