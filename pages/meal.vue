<template>
  <body>
    <section>
      <h2>食べたものを記録する</h2>
      <p>{{ meals }}</p>
      

      <input type="date" v-model="date" /><br />
      <input type="text" placeholder="morning" v-model="morning" /><br />
      <input type="text" placeholder="lunch" v-model="lunch" /><br />
      <input type="text" placeholder="dinner" v-model="dinner" /><br />
      <v-btn @click.prevent="addMeal">記録する</v-btn>
    </section>
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
      this.addMealAC(meal);
    },
    ...mapActions("mealStore", ["addMealAC"])
  },
  computed: {
    //...mapGetters(["getMeal"])
    meals() {
      return this.$store.state.mealStore.meal;
    }
  }
};
</script>

<style scoped></style>
