<template>
  <v-app>
    <v-card width="300px" height="200px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">体重記録</h1>
        <p>{{ getWeights }}</p>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            prepend-icon="mdi-arm-flex-outline"
            label="kg"
            v-model.number="weight"
            outlined
          />
          <v-card-actions>
            <v-btn @click="addWeight">追加</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  head() {
    return {
      title: "記録"
    };
  },
  data() {
    return {
      weight: null,
      date:"2021/11/12"
    };
  },
  methods: {
    addWeight() {
      let weight={
        weight:this.weight,
        date:this.date
      }
      if (!isNaN(this.weight)) {
        this.addWeightAC({ weight: weight, uid: this.uid });
      } else {
        console.log("数値以外が入力されています");
      }
      this.weight = null;
    },
    ...mapActions("weightStore", ["addWeightAC"])
  },
  computed: {
    uid() {
      //rootのstoreのgettersの値をmaelStoreで使うため、引数にもたせるためによびだしている
      return this.$store.getters.getUserUid;
    },
    getWeights() {
      return this.$store.getters["weightStore/getWeights"];
    }
  }
};
</script>
