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
  fetchMealMU(state, { mealFromDb }) {
    state.meals.push(mealFromDb);
  },
  deleteMealMU(state,{deleteMealId}){
    console.log("deleteMealMUは"+ deleteMealId)
    let deleteMealIndex = state.meals.findIndex(meal=>
      meal.id === deleteMealId
    )
    state.meals.splice(deleteMealIndex,1);
    console.log(deleteMealIndex)
  }
};

export const actions = {
  //dbへの食事内容追加処理----------------------------------------
  addMealAC({ commit }, { meal, uid }) {
    db.collection(`users/${uid}/meals`)
      .add(meal)
      .then(doc => {
        console.log(doc.id); //mealsのid
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
  deleteMealAC({commit},{deleteMealId,uid}){
    db.collection(`users/${uid}/meals`).doc(deleteMealId).delete().then(()=>{
      console.log("dbから食事内容削除");
      commit("deleteMealMU",{deleteMealId})
    })
  }
};

export const getters = {
  getMeal(state) {
    return state.meals;
  }
};
