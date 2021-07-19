import firebase from "~/plugins/firebase";
const db = firebase.firestore();

export const state = () => ({
  weights: []
});

export const mutations = {
  //stateへの体重追加処理-----------------------------------
  addWeightMU(state, { weight }) {
    state.weights.push(weight);
  },
  fetchWeightMU(state, { weightFromDb }) {
    state.weights.push(weightFromDb);
  },
  clearWeightStoreAC(state) {
    state.weights = [];
  },
  deleteWeightMU(state,{deleteWeightId}){
    let deleteWeightIndex = state.weights.findIndex(
      weight => weight.id === deleteWeightId
    );
    state.weights.splice(deleteWeightIndex, 1);
  }
};

export const actions = {
  //dbへの体重追加処理-------------------------------------
  addWeightAC({ commit }, { weight, uid }) {
    db.collection(`users/${uid}/weights`)
      .add(weight)
      .then(doc => {
        commit("addWeightMU", { weight });
      });
  },
  //dbから体重のデータを取得する処理-----------------------------------
  fetchWeightAC({ commit }, { uid }) {
    db.collection(`users/${uid}/weights`)
      .get()
      .then(weight => {
        weight.forEach(weight => {
          let weightFromDb = {};
          weightFromDb = { ...weight.data(), id: weight.id };
          commit("fetchWeightMU", { weightFromDb });
        });
      });
  },
  "clearWeightStore"({ commit }) {
    commit("clearWeightStoreAC");
  },
  deleteWeightAC({commit},{deleteWeightId,uid}){
        db.collection(`users/${uid}/weights`)
      .doc(deleteWeightId)
      .delete()
      .then(() => {
        commit("deleteWeightMU", { deleteWeightId });
      });
  }
};

export const getters = {
  getWeights(state) {
    const stateweights = [...state.weights];
    const sortWeight = stateweights.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return sortWeight;
  }
};
