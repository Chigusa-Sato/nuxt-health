import firebase from "~/plugins/firebase";
const db = firebase.firestore();

export const state = () => ({
  weights: []
});

export const mutations = {
  //stateへの体重追加処理-----------------------------------
  addWeightMU(state, { weight }) {
    console.log("addWeightMU");
    state.weights.push(weight);
  },
  fetchWeightMU(state, { weightFromDb }) {
    state.weights.push(weightFromDb);
  },
};

export const actions = {
  //dbへの体重追加処理-------------------------------------
  addWeightAC({ commit }, { weight, uid }) {
    console.log("addWeightDBに追加");
    db.collection(`users/${uid}/weights`)
      .add(weight)
      .then(doc => {
        console.log(doc.id);
        commit("addWeightMU", { weight });
      });
  },
    //dbから体重のデータを取得する処理-----------------------------------
    fetchWeightAC({ commit }, { uid }) {
        db.collection(`users/${uid}/weights`)
          .get()
          .then(weight => {
            weight.forEach(weight => {
                console.log(weight.data());
              let weightFromDb = { ...weight.data(), id: weight.id };
              commit("fetchWeightMU", { weightFromDb });
            });
          });
      },
};

export const getters = {
  getWeights(state) {
    return state.weights;
  }
};
