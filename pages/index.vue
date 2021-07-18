<template>
  <body>
    <section class="home-hero">
      <v-container fluid fill-height class="home-hero__content">
        <v-row>
          <v-col class="home-hero__content-text">
            <div class="background">
              <h1 class="list-title">食事・体重記録アプリ</h1>
              <div class="list-text">
                <p>毎日の食事内容と体重の記録</p>
                <p>食事内容の確認</p>
                <p>体重のグラフ化</p>
                </div>
                <v-btn @click="logIn">ログイン</v-btn>
                <v-btn @click="signUp">会員登録</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </body>
</template>

<script>
export default {
  head() {
    return {
      title: "ホーム"
    };
  },
  methods: {
    logIn() {
      this.$router.push({ path: "logIn" });
    },
    signUp() {
      this.$router.push({ path: "signup" });
    }
  }
};
</script>

<style scoped lang="scss">
.home-hero__content {
  background: url("@/assets/brooke-lark-GwNsgnSAfQM-unsplash.jpg");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
  &-title {
    color: rgb(29, 29, 29);
  }
  &-text {
    text-align: center;
  }
}
.list {
  &-title {
    color: rgb(75, 75, 75);
    font-size: 45px;
    display: inline-block;
    margin-top: 50px;
  }
  &-text {
    margin: 70px;
    font-size: 25px;
  }
}
.background {
  width: 800px;
  height: 500px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
