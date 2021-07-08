<template>
  <body>
    <div>
      <h1>体重記録</h1>
      <ul>
          <li v-for="todo in $store.getters.getTodos" :key="todo.todo">{{todo.morning}}{{todo.lunch}}</li>
      </ul>
    </div>
  </body>
</template>

<script>
export default {
  head() {
    return {
      title: "記録"
    };
  },
  data(){
      return{
          username:"",
          password:""
      }
  },
   methods: {
       
   },
   created() {
   this.$store.dispatch('fetchTodos')
 }
};
</script>
