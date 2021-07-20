<template>
    <v-app>
      <v-main>
        <v-form>
          <v-container class="basecard">
            <v-row>
              <v-spacer></v-spacer>
              <v-col sm="3">
                <h1>食事内容一覧</h1>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-col sm="2">
                <v-select
                  :items="selectyear"
                  v-model="year"
                  outlined
                  dense
                  label="year"
                ></v-select>
              </v-col>
              <v-col sm="2">
                <v-select
                  :items="selectmonth"
                  v-model="month"
                  outlined
                  dense
                  label="month"
                ></v-select>
              </v-col>
              <v-col sm="2">
                <v-btn outlined color="teal" @click="select">
                  <v-icon>mdi-format-list-bulleted-square</v-icon>
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
                <v-row>
      <v-spacer></v-spacer>
      <v-col sm="6">
        <v-alert
          dense
          type="error"
          v-show="!selectDates.length && this.show == true"
        >
          <strong>{{ this.year }}/{{ this.month }}</strong>
          のデータは未登録です
        </v-alert>
        <v-alert v-show="!this.sortDate.length" dense type="error">登録されたデータはありません</v-alert>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
          </v-container>
        </v-form>
        <v-container>
          <section>
            <v-layout wrap>
              <v-flex
                sm4
                md4
                lg4
                v-for="(meal, index) in sortDate"
                :key="index"
              >
                <v-card outlined class="ma-3">
                  <v-card-title>{{ meal.date }}</v-card-title>
                  <v-card-text>
                    <v-icon>mdi-baguette</v-icon>{{ meal.morning }}
                    <v-divider></v-divider>
                    <v-icon>mdi-noodles</v-icon>{{ meal.lunch }}
                    <v-divider></v-divider>
                    <v-icon>mdi-glass-wine</v-icon>{{ meal.dinner }}
                  </v-card-text>
                  <v-card-actions
                    ><v-btn @click="mealEdit(meal)">編集</v-btn></v-card-actions
                  >
                </v-card>
              </v-flex>
            </v-layout>
          </section>
        </v-container>
      </v-main>
    </v-app>
</template>

<script>
import { mapActions } from "vuex";
import DatePicker from "../components/DatePicker.vue";

export default {
  head() {
    return {
      title: "食事記録一覧"
    };
  },
  data() {
    return {
      show: false, //エラー文表示（該当なし）
      meals: [],
      selectDates: [],
      date: "",
      morning: "",
      lunch: "",
      dinner: "",
      selectyear: ["2020", "2021"],
      selectmonth: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ],
      year: "",
      month: ""
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
    mealEdit(meal) {
      let editMeal = this.getMeals.find(stateMeal => stateMeal.id === meal.id);
      this.$router.push({ path: "mealEdit", query: { id: editMeal.id } });
    },
    //絞り込み処理------------------------------------------------
    select() {
      this.selectDates = [];
      if (this.year && this.month) {
        this.getMeals.forEach(meal => {
          let string = meal.date;
          let substring = this.year + "-" + this.month;
          //セレクトした日付とデータが一致したらselectWeight配列にpush
          if (string.indexOf(substring) > -1) {
            this.selectDates.push(meal);
          }
        });
        //セレクトした日付と一致するデータが無かったら......
        if (this.selectDates.length) {
          this.show = false;
          // this.getWeights=this.selectDates
        } else {
          this.show = true;
        }
      } else {
        this.show = true;
      }
    },

    ...mapActions("mealStore", ["addMealAC", "deleteMealAC"])
  },
  computed: {
    getMeals() {
      if (!this.selectDates.length) {
        return this.$store.getters["mealStore/getMeal"];
      } else if (this.selectDates.length) {
        return this.selectDates;
      }
    },
    uid() {
      //rootのstoreのgettersの値をmaelStoreで使うため、引数にもたせるためによびだしている
      return this.$store.getters.getUserUid;
    },

    //日付順に表示する
    sortDate() {
      if (!this.selectDates.length) {
        const sortMealDate = [...this.getMeals].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        return sortMealDate;

        //return this.$store.getters["mealStore/getMeal"];
      } else if (this.selectDates.length) {
        const sortSelectMealDate = [...this.selectDates].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        return sortSelectMealDate;
      }
    }
  }
};
</script>

<style scoped></style>
