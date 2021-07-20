<template>
  <v-app>
    <v-container fluid fill-height class="home-hero__content">
      <v-card width="400px" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">会員登録</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="mdi-email"
              label="Eメール"
              v-model="email"
            />
            <v-text-field
              v-bind:type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              prepend-icon="mdi-lock"
              v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="password"
              label="パスワード"
            />
            <v-card-actions>
              <v-btn @click="signUp">登録</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  head() {
    return {
      title: "会員登録"
    };
  },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false
    };
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(result => {
          alert("Create account: ", result.email);
           this.$router.push({ path: "/" });
        })
        .catch(error => {
          alert(error.message);
        });
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
}
</style>
