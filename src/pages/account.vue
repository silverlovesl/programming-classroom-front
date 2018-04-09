<template>
  <article>
    <div v-if="isEditMode">
      <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <q-card>
            <q-card-title>
              <span v-if="mode === 1">新規</span>
              <span v-if="mode === 2">訂正</span>
            </q-card-title>
            <q-list>
              <q-item>
                <q-item-main>
                  <q-field icon="language">
                    <q-select v-model="account.nation" radio :options="nations" />
                  </q-field>
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-field icon="date range" :error="$v.account.joinDate.$error">
                    <q-datetime v-model="account.joinDate" type="date" float-label="加入日*" @blur="$v.account.joinDate.$touch" clearable />
                  </q-field>
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-field helper="ログインID" icon="mail" :error="$v.account.email.$error">
                    <q-input :disabled="isUpdate" v-model="account.email" @blur="$v.account.email.$touch" type="email" clearable float-label="メールアドレス" maxlength="50" />
                  </q-field>
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-field :count="30" icon="account box" :error="$v.account.name.$error">
                    <q-input v-model="account.name" type="text" @blur="$v.account.name.$touch" clearable float-label="氏名" maxlength="30" />
                  </q-field>
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main class="text-left">
                  <q-field label="ロール">
                    <q-radio class="q-mr-lg" v-model="account.role" :val="0" label="生徒" />
                    <q-radio v-model="account.role" :val="1" label="教師" />
                  </q-field>
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main class="text-left">
                  <q-field label="性別">
                    <q-radio v-model="account.gender" :val="true" label="男" class="q-mr-lg" />
                    <q-radio v-model="account.gender" :val="false" label="女" />
                  </q-field>
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-field icon="cake">
                    <q-datetime v-model="account.birthday" type="date" float-label="生年月日" clearable />
                  </q-field>
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main class="text-right">
                  <q-btn color="primary" :disabled="$v.$invalid" label="コミット" @click="commitUser"></q-btn>
                  <q-btn color="faded" label="取消" @click="cancelEdit"></q-btn>
                </q-item-main>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>
    </div>
    <q-table class="q-mt-lg" :pagination.sync="accountPaginationControl" selection="single" :selected.sync="selectedAccount" :columns="accountCols" row-key="id" :data="accounts">
      <template slot="top-left" slot-scope="props">
        <q-btn color="primary" label="新規" @click="addUser" class="q-mr-sm" />
        <q-btn v-if="selectedAccount.length > 0" color="secondary" label="更新" @click="updateUser" />
      </template>
    </q-table>

  </article>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import Account from "../models/account";
import { AccountService } from "../services/account.service";
export default {
  data() {
    return {
      mode: 0,
      account: new Account(),
      accounts: [],
      selectedAccount: [],
      nations: [{ label: "中国", value: 0 }, { label: "日本", value: 1 }],
      accountPaginationControl: { rowsPerPage: 10, page: 1 },
      accountCols: [
        { field: "name", label: "氏名", align: "left", required: true },
        { field: "nationName", label: "国籍", align: "center" },
        { field: "genderName", label: "性別", align: "center" },
        { field: "joinDateStr", label: "参入日", align: "center" },
        { field: "email", label: "メールアドレス", align: "left" }
      ]
    };
  },
  validations: {
    account: {
      joinDate: { required },
      email: { required, email },
      name: { required }
    }
  },
  mounted() {
    this.fetchAccounts();
  },
  methods: {
    fetchAccounts() {
      AccountService.getAccounts().then(v => {
        this.accounts = v.data.map(d => {
          return new Account().deserialize(d);
        });
        console.log(this.accounts);
      });
    },
    async fetchAccount() {
      let sa = await this.selectedAccount[0];
      AccountService.getAccount(sa.id).then(v => {
        this.account = new Account().deserialize(v);
      });
    },
    addUser() {
      this.mode = 1;
    },
    cancelEdit() {
      this.mode = 0;
      this.account = new Account();
      this.$v.$reset();
    },
    updateUser() {
      this.mode = 2;
      this.fetchAccount();
    },
    commitUser() {
      if (this.isUpdate) {
        this.$store.dispatch("account/updateAccount", this.account);
      } else {
        this.$store.dispatch("account/addAccount", this.account);
      }
      this.fetchAccounts();
      this.mode = 0;
    }
  },
  computed: {
    isEditMode() {
      return this.mode > 0;
    },
    isAdd() {
      return this.mode === 1;
    },
    isUpdate() {
      return this.mode === 2;
    }
  }
};
</script>

