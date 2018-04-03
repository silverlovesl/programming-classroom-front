<template>
  <q-layout v-if="account" view="lHh Lpr lFf" :reveal="true" :right-breakpoint="1100">
    <q-layout-header>
      <q-toolbar color="primary" :inverted="$q.theme === 'ios'">
        <q-btn flat dense @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          プログラミング 教室
          <div slot="subtitle">{{account.roleName}}</div>
        </q-toolbar-title>

        <q-btn flat round dense icon="input" @click="logout" />
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-list-header>{{account.name}}</q-list-header>
        <q-item to="/home-work">
          <q-item-side icon="chrome reader mode" />
          <q-item-main label="宿題" />
        </q-item>
        <q-item v-if="account.isTeacher" to="/account">
          <q-item-side icon="perm contact calendar" />
          <q-item-main label="学員管理" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <q-page class="q-pa-md">
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" :duration="300">
          <router-view />
        </transition>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LayoutDefault",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  methods: {
    logout() {
      this.$q
        .dialog({
          title: "確認",
          message: "ログアウトしてもよろしいでしょうか",
          ok: true,
          cancel: true
        })
        .then(v => {
          this.$store.dispatch("auth/signout");
        });
    }
  },
  mounted() {
    this.$store.dispatch("account/fetchAuthAccount");
  },
  computed: {
    ...mapGetters({
      account: "account/account",
      authError: "account/authError"
    })
  },
  watch: {
    authError() {
      this.$q
        .dialog({
          title: "認証エラー",
          message: "ログインし直してください。",
          ok: true,
          preventClose: true,
          noBackdropDismiss: true,
          noEscDismiss: true
        })
        .then(() => {
          window.location = "/signin";
        });
    }
  }
};
</script>

<style>

</style>
