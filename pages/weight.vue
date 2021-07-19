<template>
  <v-app>
    <v-container text-xs-center justify-center>
      <v-row>
        <v-col sm="3">
          <h1>体重一覧</h1>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Date
              </th>
              <th class="text-left">
                kg
              </th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(weight, index) in getWeights" :key="index">
              <td>{{ weight.date }}</td>
              <td>{{ weight.weight }}</td>
              <td><v-icon @click="deleteWeight(weight)">mdi-delete</v-icon></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    getWeights() {
      return this.$store.getters["weightStore/getWeights"];
    },
    uid() {
      //rootのstoreのgettersの値をmaelStoreで使うため、引数にもたせるためによびだしている
      return this.$store.getters.getUserUid;
    }
  },
  methods: {
    deleteWeight(weight) {
      let id = weight.id;
      let deleteWeight = this.getWeights.find(weight => weight.id === id);
      this.deleteWeightAC({ deleteWeightId: deleteWeight.id, uid: this.uid });
    },
    ...mapActions("weightStore", ["deleteWeightAC"])
  }
};
</script>

<style></style>
