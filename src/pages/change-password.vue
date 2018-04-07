<template>
  <div class="fixed-center text-center">
    <!-- An basic example -->
    <q-card class="login-area">
      <q-card-title>
        {{account.name}}
        <span slot="subtitle">{{account.email}}</span>
      </q-card-title>
      <q-list>
        <q-item>
          <q-item-main>
            <q-field icon="lock outline" :error="$v.changePasswordFrom.newPassword.$error">
              <q-input v-model="changePasswordFrom.newPassword" type="password" @blur="$v.changePasswordFrom.newPassword.$touch" float-label="新しいパスワード" clearable />
            </q-field>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-field icon="lock outline" :error="$v.changePasswordFrom.newPasswordConfirm.$error">
              <q-input v-model="changePasswordFrom.newPasswordConfirm" type="password" @blur="$v.changePasswordFrom.newPasswordConfirm.$touch" float-label="パスワード確認" clearable />
            </q-field>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main class="text-center">
            <span class="text-red" v-if="passwordNotSame">二回入力したパスワードが不一致</span>
          </q-item-main>
        </q-item>
      </q-list>
      <q-card-separator />
      <q-card-actions align="end">
        <q-btn color="secondary" :disabled="$v.$invalid" @click="commit">Commit</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { AuthService } from "../services/auth.service";
import routes from "../router";
export default {
  data() {
    return {
      changePasswordFrom: {
        newPassword: "",
        newPasswordConfirm: ""
      }
    };
  },
  validations: {
    changePasswordFrom: {
      newPassword: { required, minLength: minLength(6) },
      newPasswordConfirm: { required }
    }
  },
  methods: {
    async commit() {
      AuthService.changePassword(this.changePasswordFrom.newPassword).then(
        v => {
          if (v) {
            routes.push("/homework");
          }
        }
      );
    }
  },
  computed: {
    ...mapGetters({
      account: "account/account"
    }),
    passwordNotSame() {
      return (
        this.changePasswordFrom.newPassword.length > 0 &&
        this.changePasswordFrom.newPasswordConfirm > 0 &&
        this.changePasswordFrom.newPassword !=
          this.changePasswordFrom.newPasswordConfirm
      );
    }
  },
  mounted() {
    this.$store.dispatch("account/fetchAuthAccount");
  }
};
</script>
<style lang="stylus">
</style>
