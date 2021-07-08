<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";
export default {
  created() {
    firebase.auth().onAuthStateChanged(user => {
      // const { uid, email } = user
      if (user) {
        console.log("ユーザーあり");
        //userオブジェクトの中からemailとuidの情報のみ取得し、引数userに格納
        user = { email: user.email, uid: user.uid };
        this.setLoginUser(user);
      } else if (!user) {
        userNull = { email: "", uid: "" };
        console.log("ユーザー無し");
        this.deleteLoginUser(userNull);
      }
    });
  },
  methods: {
    ...mapActions(["setLoginUser", "deleteLoginUser"])
  }
};
</script>

<style scoped>
body {
  width: 100%;
  height: 800px;
}
</style>
