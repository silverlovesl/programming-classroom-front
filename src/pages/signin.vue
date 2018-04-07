<template>
  <div class="fixed-center text-center">
    <!-- An basic example -->
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
}
</style>
