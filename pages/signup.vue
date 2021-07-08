<template>
  <body>
    <div class="signup">
      <h2>Sign up</h2>
      <input type="text" placeholder="email" v-model="email" /><br />
      <input type="password" placeholder="Password" v-model="password" /><br />
      <v-btn @click="signUp">Register</v-btn>
    </div>
  </body>
</template>

<script>
import firebase from "firebase";
export default {
  head() {
    return {
      title: "会員登録"
    };
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(result => {
          alert("Create account: ", result.email);
          //userが戻り値として返ってくるので、それをuserに代入
        //   const user = result.user;
        //   //userに値が入っていれば
        //   if (user) {
        //     //userの中にあるuidをuidに代入
        //     const uid = user.uid;
        //     const userInitialData = {
        //       email: this.email,
        //       uid: uid,
        //       username: this.username
        //     };
        //     firebase
        //       .firestore()
        //       .collection(`users/${uid}/redords`)
        //     //   .doc(uid)
        //       .set(userInitialData)
        //       .then(console.log("ユーザーが作成されました!"+userInitialData.username));
        //   }
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>
