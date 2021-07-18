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
    //console.log("ミューテーションふぇっち"+weightFromDb)//正しくとれている
  },
  clearWeightStoreAC(state) {
    state.weights = [];
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
          // console.log("フェッチアクション！" + weightFromDb);//正しくとれている
        });
      });
  },
  "clearWeightStore"({ commit }) {
    commit("clearWeightStoreAC");
  }
};

export const getters = {
  getWeights(state) {
    console.log(state.weights); //既に倍増
    const stateweights = [...state.weights];
    const sortWeight = stateweights.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return sortWeight;
  }
};
