import firebase from "~/plugins/firebase";
const db = firebase.firestore();

export const state = () => ({
  meal: []
});

export const mutations = {
  addMealMU(state, meal) {
    console.log("MUのミール⇒" + meal);
    state.meal.push(meal);
  }
};

export const actions = {
  addMealAC({ getters,commit }, meal) {
    console.log("アクションのミール⇒" + meal);
    db.collection("meals").add
    commit("addMealMU", meal);
  }
};

export const getters = {
  getMeal(state) {
    return state.meal;
  }
};
