<template>
  <v-app class="bg">
    <v-content>
      <section class="home-hero">
        <v-container fluid fill-height class="home-hero__content">
            <v-row>
              <v-spacer></v-spacer>
              <v-col sm2 align="center">
                <v-card width="400px" height="500px">
                  <v-card-title>
                    <h1 class="display-1">食事記録</h1>
                  </v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        v-model="date"
                        single-line
                        placeholder="date"
                      >
                        <template v-slot:append-outer>
                          <date-picker v-model="date" />
                        </template>
                      </v-text-field>

                      <v-text-field
                        placeholder="morning"
                        v-model="morning"
                        prepend-icon="mdi-baguette"
                        outlined
                      />
                      <v-text-field
                        outlined
                        placeholder="lunch"
                        prepend-icon="mdi-noodles"
                        v-model="lunch"
                      />
                      <v-text-field
                        outlined
                        placeholder="dinner"
                        prepend-icon="mdi-glass-wine"
                        v-model="dinner"
                      />
                      <v-btn @click="addMeal">追加</v-btn>
                      <router-link to="/meal" class="routerLink"
                        ><v-btn>一覧を見る</v-btn></router-link
                      >
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col sm2 align="center">
                <v-card width="400px" height="400px">
                  <v-card-title>
                    <h1 class="display-1">体重記録</h1>
                  </v-card-title>
                  <v-card-text>
                    <v-form>
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
                      <v-text-field
                        prepend-icon="mdi-foot-print"
                        label="kg"
                        v-model.number="weight"
                        outlined
                      />
                      <v-card-actions>
                        <v-btn @click="addWeight">追加</v-btn>
                        <router-link to="/weightChart" class="routerLink"
                          ><v-btn>一覧を見る</v-btn></router-link
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
        </v-container>
      </section>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import DatePicker from "../components/DatePicker.vue";

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
    DatePicker
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
/* .bg {
  background: url("~assets/healthy.jpg");
} */

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
</style>
