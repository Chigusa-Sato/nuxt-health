<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="#fcb69f"
        dark
        shrink-on-scroll
        scroll-target="#scrolling-techniques-2"
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props"></v-img>
        </template>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <p>ログイン中：{{  getDisplayName }}</p><br>

        <v-spacer></v-spacer>

        <router-link to="/">ホーム |</router-link>
        <router-link to="/signup">会員登録 |</router-link>
        <router-link to="/login">ログイン |</router-link>
        <router-link to="/meal">食事記録 |</router-link>
        <router-link to="/weight">体重記録</router-link>
        <v-btn @click="signOut">ログアウト</v-btn>
      </v-app-bar>
      <v-container
        fluid
        fill-height
        align
        start
        style="height: 127px;"
      ></v-container>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    getDisplayName() {
      return this.$store.getters.getDisplayName;
    },
    getUserUid(){
      return this.$store.getters.getUserUid;
    }
  },
  methods:{
    ...mapActions(["signOut"])
  }
};
</script>

<style>
.header {
  background: rgb(255, 252, 203);
}
</style>
