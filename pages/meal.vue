<template>
  <body>
    <v-app>
      <v-content>
        <v-container>
      <section>
        <input type="date" v-model="date" /><br />
        <input type="text" placeholder="morning" v-model="morning" /><br />
        <input type="text" placeholder="lunch" v-model="lunch" /><br />
        <input type="text" placeholder="dinner" v-model="dinner" /><br />
        <v-btn @click="addMeal">記録する</v-btn>
      </section>
      <section>
        <v-layout justify-space-around>
          <v-flex xs12 sm12 md3>
        <v-card
          elevation="8"
          outlined
          tiled
          v-for="(meal,index) in meals"
          :key="index"
        >
          <v-card-title>{{ meal.date }}</v-card-title>
          <v-card-text
            >朝：{{ meal.morning }}<br />
            昼：{{ meal.lunch }} <br />
            夜：{{ meal.dinner }}
          </v-card-text>
          <v-card-actions><v-btn >編集</v-btn></v-card-actions>
          <v-card-actions><v-btn @click="deleteMeal(meal)">削除</v-btn></v-card-actions>
        </v-card>
        </v-flex>
        </v-layout>
      </section>
      </v-container>
      </v-content>
    </v-app>
  </body>
</template>

<script>
import { mapActions } from "vuex";

export default {
  head() {
    return {
      title: "食事記録"
    };
  },
  data() {
    return {
      date: "",
      morning: "",
      lunch: "",
      dinner: ""
      //stateMeal:this.$store.state['mealstore/meals']
    };
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
      this.date=""
      this.morning=""
      this.lunch=""
      this.dinner=""
    },
    deleteMeal(meal) {
      console.log(this.meals);
      let deleteMeal = this.meals.find(stateMeal => stateMeal.id === meal.id);
      console.log(deleteMeal.id);
      this.deleteMealAC({ deleteMealId: deleteMeal.id, uid: this.uid });
    },
    ...mapActions("mealStore", ["addMealAC", "deleteMealAC"])
  },
  computed: {
    //...mapGetters(["getMeal"])
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

<style scoped></style>
