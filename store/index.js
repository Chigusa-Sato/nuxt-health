import firebase from "~/plugins/firebase";
const db = firebase.firestore();
//const todoRef = db.collection("foods");

//ユーザー登録・認証系の処理----------------------------------------

export const state = () => ({
  userUid: "",
  userName: "",
  //foods: [],
  login_user: {
    email:"",
    uid:""
  }
});

export const mutations = {
  setUserUid(state, userUid) {
    state.userUid = userUid;
  },
  setUserName(state, userName) {
    state.userName = userName;
  },
  //   addTodo(state, food) {
  //     state.foods.push(food);
  //   },
  setLoginUserMU(state, user) {
    state.login_user = user;
  },
  deleteLoginUserMU(state) {
    state.login_user = userNull;
  }
};

export const actions = {
  setLoginUser({ commit }, user) {
    commit("setLoginUserMU", user);
  },
  deleteLoginUser({ commit, userNull }) {
    commit("deleteLoginUserMU", userNull);
  },
  signIn({ commit }, { email, pass }) {
    console.log(email + pass);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(
        user => {
          alert("Success!");
          commit("setUserUid", user.uid);
          commit("setUserName", user.email);
          this.$router.push("/");
        },
        err => {
          alert(err.message);
        }
      );
  },
  signOut() {
    firebase.auth().signOut();
  }

  //   fetchTodos({ commit }) {
  //     todoRef
  //       .get()
  //       .then(res => {
  //         res.forEach(doc => {
  //           console.log("success : " + `${doc.id} => ${doc.data()}`);
  //           commit("addTodo", doc.data());
  //         });
  //       })
  //       .catch(error => {
  //         console.log("error : " + error);
  //       });
  //   }
};

export const getters = {
  getDisplayName(state) {
    return state.login_user.email;
  },
  getUserUid(state) {
    return state.login_user.uid;
  },
  getUserName(state) {
    return state.userName;
  },
  getTodos(state) {
    return state.todos;
  }
};
