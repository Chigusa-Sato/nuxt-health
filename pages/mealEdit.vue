<template>
  <v-app>
    <v-content>
      <v-container>
        <section>
          <v-card width="1000px" class="mx-auto mt-5">
            <v-card-title>
              <h1 class="display-1">食事記録を編集する</h1>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field v-model="date" single-line>
                  <template v-slot:append-outer>
                    <date-picker />
                  </template>
                </v-text-field>
                <br />
                <v-text-field placeholder="morning" v-model="morning" /><br />
                <v-text-field placeholder="lunch" v-model="lunch" /><br />
                <v-text-field placeholder="dinner" v-model="dinner" /><br />
                <v-btn @click="updateMeal">保存</v-btn>
                <router-link to="/meal"><v-btn>一覧に戻る</v-btn></router-link>
                <v-btn @click="deleteMeal(id)">削除</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </section>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      date: "",
      morning: "",
      lunch: "",
      dinner: "",
      id:this.$route.query.id
    };
  },
  mounted() {
    const editMeal = this.$store.getters["mealStore/getMealById"](
      this.$route.query.id
    );
    if (editMeal) {
      this.date = editMeal.date;
      this.morning = editMeal.morning;
      this.lunch = editMeal.lunch;
      this.dinner = editMeal.dinner;
    }
  },
  methods: {
    clear() {
      this.date = "";
      this.morning = "";
      this.lunch = "";
      this.dinner = "";
    },
    deleteMeal(id){
      console.log(id);
      let deleteMeal = this.$store.getters["mealStore/getMeal"].find(getMeal => getMeal.id === id);
      console.log(deleteMeal);
      this.deleteMealAC({ deleteMealId: deleteMeal.id, uid: this.uid });
    },
    updateMeal() {
      let editMealforDB = {
        date: this.date,
        morning: this.morning,
        lunch: this.lunch,
        dinner: this.dinner
      };
      if (this.$route.query.id) {
       this.updateMealAC({
          editMealId: this.$route.query.id,
          editMeal: editMealforDB,
          uid: this.uid
        });
      }
      //this.$router.push({ path: "meal"});
    },
    ...mapActions("mealStore", ["updateMealAC","deleteMealAC"])
  },
  computed: {
    uid() {
      //rootのstoreのgettersの値をmaelStoreで使うため、引数にもたせるためによびだしている
      return this.$store.getters.getUserUid;
    }
  }
};
</script>
