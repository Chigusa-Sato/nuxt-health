<template>
  <body>
    <div>
      <h1>ログインページ</h1>
       <input type="text" placeholder="Username" v-model="email"><br>
    <input type="password" placeholder="Password" v-model="password"><br>
    <v-btn  @click="signIn">Signin</v-btn>
      <!-- <v-btn @click="login">ログインする</v-btn>
      <p>user: {{ $store.getters.getUserName }}</p> -->
    </div>
  </body>
</template>

<script>
export default {
  head() {
    return {
      title: "ログイン"
    };
  },
  data(){
    return{
      email:"",
      password:""
    }
  },
  methods:{
    login(){
      console.log("login")
      this.$store.dispatch('login')
    },
    signIn(){
      console.log("signIn")
            this.$store.dispatch('signIn',{email:this.email,pass:this.password})

    }
  }
};
</script>
