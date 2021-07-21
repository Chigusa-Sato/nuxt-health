<template>
  <v-app class="bg">
    <v-main>
      <section class="home-hero">
        <v-container fluid fill-height class="home-hero__content">
          <v-row>
            <v-spacer></v-spacer>
            <v-col sm2 align="center">
              <v-card width="400px" height="600px">
                <v-card-title>
                  <h1 class="display-1">食事記録</h1>
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <ValidationObserver v-slot="ObserverProps">
                      <v-text-field
                        v-model="date"
                        single-line
                        placeholder="date"
                      >
                        <template v-slot:append-outer>
                          <date-picker v-model="date" />
                        </template>
                      </v-text-field>
                      <ValidationProvider name="morning" rules="required">
                        <div slot-scope="Providerprops">
                          <v-text-field
                            placeholder="morning"
                            v-model="morning"
                            prepend-icon="mdi-baguette"
                            outlined
                          />
                          <p class="message--error">
                            {{ Providerprops.errors[0] }}
                          </p>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider name="lunch" rules="required">
                        <div slot-scope="Providerprops">
                          <v-text-field
                            outlined
                            placeholder="lunch"
                            prepend-icon="mdi-noodles"
                            v-model="lunch"
                          />
                          <p class="message--error">
                            {{ Providerprops.errors[0] }}
                          </p>
                        </div>
                      </ValidationProvider>

                      <ValidationProvider name="dinner" rules="required">
                        <div slot-scope="Providerprops">
                          <v-text-field
                            outlined
                            placeholder="dinner"
                            prepend-icon="mdi-glass-wine"
                            v-model="dinner"
                          />
                          <p class="message--error">
                            {{ Providerprops.errors[0] }}
                          </p>
                        </div>
                      </ValidationProvider>

                      <v-btn
                        @click="addMeal"
                        :disabled="
                          ObserverProps.invalid || !ObserverProps.validated
                        "
                        >追加</v-btn
                      >
                      <router-link to="/meal" class="routerLink"
                        ><v-btn>一覧を見る</v-btn></router-link
                      >
                    </ValidationObserver>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col sm2 align="center">
              <v-card width="400px" height="500px">
                <v-card-title>
                  <h1 class="display-1">体重記録</h1>
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <ValidationObserver v-slot="ObserverProps">
                      <v-text-field
                        v-model="date"
                        single-line
                        placeholder="date"
                      >
                        <template v-slot:append-outer>
                          <!-- v-slot:append-outerテキストフィールドのお尻の部分にUI表示を追加 -->
                          <date-picker v-model="date" />
                        </template>
                      </v-text-field>
                      <ValidationProvider name="体重" rules="required">
                        <div slot-scope="Providerprops">
                          <v-text-field
                            prepend-icon="mdi-foot-print"
                            label="kg"
                            v-model.number="weight"
                            outlined
                          />
                          <p class="message--error">
                            {{ Providerprops.errors[0] }}
                          </p>
                        </div>
                      </ValidationProvider>

                      <div class="buttons">
                        <v-card-actions>
                          <v-btn
                            @click="addWeight"
                            :disabled="
                              ObserverProps.invalid || !ObserverProps.validated
                            "
                            >追加</v-btn
                          >
                          <router-link to="/weightChart" class="routerLink"
                            ><v-btn>一覧を見る</v-btn></router-link
                          >
                        </v-card-actions>
                      </div>
                    </ValidationObserver>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
      </section>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import DatePicker from "../components/DatePicker.vue";
import ja from "vee-validate/dist/locale/ja.json";
import {
  localize,
  extend,
  ValidationObserver,
  ValidationProvider
} from "vee-validate";
import { required } from "vee-validate/dist/rules";
extend("required", required);
localize("ja", ja);

export default {
  head() {
    return {
      title: "記録"
    };
  },
  data() {
    return {
      date: "",
      morning: "",
      lunch: "",
      dinner: "",
      weight: null,
      date: ""
    };
  },
  components: {
    DatePicker,
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    addMeal() {
      let meal = {
        date: this.date,
        morning: this.morning,
        lunch: this.lunch,
        dinner: this.dinner
      };
      this.addMealAC({ meal: meal, uid: this.uid });
      this.date = "";
      this.morning = "";
      this.lunch = "";
      this.dinner = "";
    },
    addWeight() {
      let weight = {
        weight: this.weight,
        date: this.date
      };
      if (!isNaN(this.weight)) {
        this.addWeightAC({ weight: weight, uid: this.uid });
      } else {
        console.log("数値以外が入力されています");
      }
      this.weight = null;
    },
    ...mapActions("mealStore", ["addMealAC"]),
    ...mapActions("weightStore", ["addWeightAC"])
  },
  computed: {
    meals() {
      return this.$store.getters["mealStore/getMeal"];
    },
    uid() {
      //rootのstoreのgettersの値をmaelStoreで使うため、引数にもたせるためによびだしている
      return this.$store.getters.getUserUid;
    }
  }
};
</script>

<style scoped lang="scss">
.routerLink {
  text-decoration: none;
}
.v-card {
  height: 800px;
  opacity: 0.9;
}
.home-hero__content {
  background: url("@/assets/brooke-lark-GwNsgnSAfQM-unsplash.jpg");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
  &-text {
    color: rgb(53, 53, 53);
    text-align: center;
    font-size: 28px;
    font-weight: bold;
  }
}
.buttons {
  padding-left: 25%;
}
.message {
  &--error {
    color: red;
    font-size: 0.6rem;
  }
}
</style>
