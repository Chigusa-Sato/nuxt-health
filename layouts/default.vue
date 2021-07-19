<template>
  <div class="background">
    <!-- Header -->
    <div>
      <v-app-bar
        color="rgb(255, 251, 228)"
        shrink-on-scroll
        scroll-target="#scrolling-techniques-2"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title @click="home"><img :src="require('@/assets/logo2.png')" /></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text @click="login" v-if="!getUserUid">ログイン </v-btn>
        <v-btn text @click="signOut" v-if="getUserUid">ログアウト</v-btn>
      </v-app-bar>
      <v-container fluid fill-height align start></v-container>
    </div>
    <!-- Header -->

    <!-- side -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item>
          <v-list-item-avatar><v-icon>mdi-account</v-icon></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-if="getUserUid">{{
              getDisplayName
            }}</v-list-item-title>
            <v-list-item-title v-if="!getUserUid"
              >ログインしてください</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <!-- ログアウト時のサイドナビメニュー -->
        <div v-if="!getUserUid">
          <v-list-item
            v-for="(item, index) in logoutSideMenu"
            :key="index"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon class="side-icon">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <!-- ログイン時のサイドナビメニュー -->
        <div v-else>
          <v-list-item
            v-for="(item, index) in filteredList"
            :key="index"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon class="side-icon">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <Nuxt />
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      loginSideMenu: [
        {
          title: "食事一覧",
          icon: "mdi-food-fork-drink",
          link: { name: "meal" }
        },
        { title: "体重一覧", icon: "mdi-foot-print", link: { name: "weight" } },
        {
          title: "体重グラフ",
          icon: "mdi-chart-line",
          link: { name: "weightChart" }
        },
        {
          title: "記録",
          icon: "mdi-lead-pencil",
          link: { name: "record" }
        }
      ],
      logoutSideMenu: [
        {
          title: "ホーム",
          icon: "mdi-home",
          link: { name: "index" }
        },
        {
          title: "ログイン",
          icon: "mdi-login",
          link: { name: "login" }
        }
      ]
    };
  },
  computed: {
    filteredList() {
      return this.loginSideMenu.filter(item => {
        return item.title !== "ホーム";
      });
    },
    login_user() {
      return this.$store.state.login_user;
    },
    getDisplayName() {
      return this.$store.getters.getDisplayName;
    },
    getUserUid() {
      return this.$store.getters.getUserUid;
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      // const { uid, email } = user
      if (user) {
        this.clearWeightStore();
        this.clearMealStore();
        //userオブジェクトの中からemailとuidの情報のみ取得し、引数userに格納
        user = { email: user.email, uid: user.uid };
        this.setLoginUser(user);

        this.fetchMealAC({ uid: user.uid });
        this.fetchWeightAC({ uid: user.uid });
      } else if (!user) {
        user = { email: "", uid: "" };
        //storeの値を空にするしょり
        this.clearWeightStore();
        this.clearMealStore();
        this.deleteLoginUser(user);
      }
    });
  },
  methods: {
    home() {
      this.$router.push({ path: "/" });
    },
    login() {
      this.$router.push({ path: "logIn" });
    },
    ...mapActions([
      "setLoginUser",
      "deleteLoginUser",
      "toggleSideMenu",
      "signOut"
    ]),
    ...mapActions("mealStore", ["fetchMealAC", "clearMealStore"]),
    ...mapActions("weightStore", ["fetchWeightAC", "clearWeightStore"])
  }
};
</script>

<style scoped>
body {
  width: 100%;
  height: 800px;
}
.routerLink {
  text-decoration: none;
}
.side-icon {
  display: inline-block;
  padding: 10px;
}
</style>
