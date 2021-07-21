import firebase from "~/plugins/firebase";

//ユーザー登録・認証系の処理----------------------------------------

export const state = () => ({
  userUid: "",
  userName: "",
  login_user: {
    email: "",
    uid: ""
  },
  drawer: false
});

export const mutations = {
  setUserUid(state, userUid) {
    state.userUid = userUid;
  },
  setUserName(state, userName) {
    state.userName = userName;
  },
  setLoginUserMU(state, user) {
    state.login_user = user;
  },
  deleteLoginUserMU(state, user) {
    state.login_user = user;
  },
  toggleSideMenu(state) {
    state.drawer = !state.drawer;
  }
};

export const actions = {
  setLoginUser({ commit }, user) {
    commit("setLoginUserMU", user);
  },
  deleteLoginUser({ commit }, user) {
    commit("deleteLoginUserMU", user);
  },
  signIn({ commit }, { email, pass }) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(
        user => {
          alert("ログインに成功しました");
          commit("setUserUid", user.uid);
          commit("setUserName", user.email);
          this.$router.push("/");
        },
        err => {
          alert("Eメールまたはパスワードの値が異なっています");
        }
      );
  },
  signOut() {
    firebase.auth().signOut();
    this.$router.push("/");
  },
  toggleSideMenu({ commit }) {
    commit("toggleSideMenu");
  }
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
