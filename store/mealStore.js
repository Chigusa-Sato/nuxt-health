import firebase from "~/plugins/firebase";
const db = firebase.firestore();

export const state = () => ({
  meals: []
});

export const mutations = {
  //stateへの食事内容追加処理-------------------------------------
  addMealMU(state, { meal, mealId }) {
    meal.id = mealId;
    state.meals.push(meal);
  },
  //stateの食事内容のデータを取得する処理-----------------------------------
  fetchMealMU(state, { mealFromDb }) {
    state.meals.push(mealFromDb);
  },
  //stateの食事内容のデータを削除する処理-----------------------------------
  deleteMealMU(state, { deleteMealId }) {
    let deleteMealIndex = state.meals.findIndex(
      meal => meal.id === deleteMealId
    );
    state.meals.splice(deleteMealIndex, 1);
  },
  //stateの食事内容のデータを編集する処理-----------------------------------
  updateMealMU(state, { editMealId, editMeal }) {
    const index = state.meals.findIndex(meal => meal.id === editMealId);
    state.meals[index] = editMeal;
  },
  clearMealStoreMU(state){
    state.meals=[]
  }
};

export const actions = {
  //dbへの食事内容追加処理----------------------------------------
  addMealAC({ commit }, { meal, uid }) {
    db.collection(`users/${uid}/meals`)
      .add(meal)
      .then(doc => {
        let mealId = doc.id;
        commit("addMealMU", { meal, mealId });
      });
  },
  //dbから食事内容のデータを取得する処理-----------------------------------
  fetchMealAC({ commit }, { uid }) {
    db.collection(`users/${uid}/meals`)
      .get()
      .then(meals => {
        meals.forEach(meal => {
          let mealFromDb = { ...meal.data(), id: meal.id };
          commit("fetchMealMU", { mealFromDb });
        });
      });
  },
  //dbの食事内容のデータを削除する処理-----------------------------------
  deleteMealAC({ commit }, { deleteMealId, uid }) {
    db.collection(`users/${uid}/meals`)
      .doc(deleteMealId)
      .delete()
      .then(() => {
        commit("deleteMealMU", { deleteMealId });
      });
  },
  //dbの食事内容のデータを編集する処理-----------------------------------
  updateMealAC({ commit }, { editMealId, editMeal, uid }) {
    db.collection(`users/${uid}/meals`)
      .doc(editMealId)
      .update(editMeal)
      .then(() => commit("updateMealMU", { editMealId, editMeal, uid }));
  },
  clearMealStore({commit}){
    commit("clearMealStoreMU")
  }
};

export const getters = {
  getMeal(state) {
    return state.meals;
  },
  getMealById: state => paramsId => {
    return state.meals.find(meal => meal.id === paramsId);
  },
  getOnlyMealDate(state) {
    let onlyDate = [];
    state.meals.forEach(meal => {
      onlyDate.push(meal.date);
    });
    return onlyDate;
  }
};
