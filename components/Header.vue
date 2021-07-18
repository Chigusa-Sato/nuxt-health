<template>
  <div>
      <v-app-bar
        color="#fcb69f"
        shrink-on-scroll
        scroll-target="#scrolling-techniques-2"
      >
        <!-- <template v-slot:img="{ props }">
          <v-img v-bind="props"></v-img>
        </template> -->
        <v-app-bar-nav-icon @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ getDisplayName }}</v-toolbar-title>
        

        <v-spacer></v-spacer>
      <v-btn><router-link to="/">ホーム</router-link></v-btn>
      <v-btn><router-link to="/signup">会員登録 </router-link></v-btn>
       <v-btn><router-link to="/login">ログイン </router-link> </v-btn> 
       <v-btn><router-link to="/meal">食事</router-link> </v-btn> 
        <v-btn><router-link to="/weightChart">体重</router-link> </v-btn> 
       <v-btn><router-link to="/record">記録</router-link> </v-btn> 
        <v-btn @click="signOut">ログアウト</v-btn>
      </v-app-bar>
      <v-container
        fluid
        fill-height
        align
        start
        style="height: 200px;"
      ></v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    getDisplayName() {
      return this.$store.getters.getDisplayName;
    },
    getUserUid() {
      return this.$store.getters.getUserUid;
    }
  },
  methods: {
    ...mapActions(["signOut","toggleSideMenu",])
  }
};
</script>

<style>
.header {
  background: rgb(255, 252, 203);
}
</style>
