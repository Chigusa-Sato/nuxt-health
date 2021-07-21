<template>
  <v-app>
    <v-container fluid fill-height class="home-hero__content">
      <v-card width="400px" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">ログイン</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <ValidationObserver v-slot="ObserverProps">
              <ValidationProvider name="Eメール" rules="required|email">
                <div slot-scope="Providerprops">
                  <v-text-field
                    prepend-icon="mdi-email"
                    label="Eメール"
                    v-model="email"
                  />
                  <p class="message--error">
                    {{ Providerprops.errors[0] }}
                  </p>
                </div>
              </ValidationProvider>

              <ValidationProvider
                name="パスワード"
                :rules="{ required: true, regex: /^[a-z\d]{6,12}$/i }"
              >
                <div slot-scope="Providerprops">
                  <v-text-field
                    v-bind:type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    prepend-icon="mdi-lock"
                    v-bind:append-icon="
                      showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    v-model="password"
                    label="パスワード"
                  />
                  <p class="message--error">
                    {{ Providerprops.errors[0] }}
                  </p>
                </div>
              </ValidationProvider>

              <v-card-actions>
                <v-btn
                  @click="signIn"
                  :disabled="ObserverProps.invalid || !ObserverProps.validated"
                  >ログイン</v-btn
                >
              </v-card-actions>
            </ValidationObserver>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import ja from "vee-validate/dist/locale/ja.json";
import {
  localize,
  extend,
  ValidationObserver,
  ValidationProvider
} from "vee-validate";
import { required, email, regex } from "vee-validate/dist/rules";
extend("required", required);
extend("email", email);
extend("regex", regex);

localize("ja", ja);

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
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    login() {
      this.$store.dispatch("login");
    },
    signIn() {
      this.$store.dispatch("signIn", {
        email: this.email,
        pass: this.password
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
.message {
  &--error {
    color: red;
    font-size: 0.8rem;
  }
}
</style>
