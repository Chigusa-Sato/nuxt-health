<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">ログイン</h1>
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
            <v-btn  @click="signIn">ログイン</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      title: "ログイン"
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
    login() {
      console.log("login");
      this.$store.dispatch("login");
    },
    signIn() {
      console.log("signIn");
      this.$store.dispatch("signIn", {
        email: this.email,
        pass: this.password
      });
    }
  }
};
</script>
