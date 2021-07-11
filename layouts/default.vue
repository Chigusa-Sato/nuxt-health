<template>
  <div>
    <Header />
    <Nuxt />
    <!-- <Footer /> -->
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
        //userオブジェクトの中からemailとuidの情報のみ取得し、引数userに格納
        user = { email: user.email, uid: user.uid };
        this.setLoginUser(user);
        this.fetchMealAC({ uid: user.uid });
        this.fetchWeightAC({ uid: user.uid });
      } else if (!user) {
        user = { email: "", uid: "" };
        this.deleteLoginUser(user);
      }
    });
  },
  methods: {
    ...mapActions(["setLoginUser", "deleteLoginUser"]),
    ...mapActions("mealStore", ["fetchMealAC"]),
    ...mapActions("weightStore", ["fetchWeightAC"])
  }
};
</script>

<style scoped>
body {
  width: 100%;
  height: 800px;
}
</style>
