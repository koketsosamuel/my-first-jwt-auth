<template>
  <div class="hello">
    <div v-if(error)>{{msg}}</div>
    <h2>Register</h2>
    <input type="text" v-model="username" placeholder="username">
    <br>
    <br>
    <input type="text" v-model="password" placeholder="password">

    <br><br>

    <button @click="register">Register</button>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data(){
    return {
      password: '',
      username: '',
      msg: ''
    }
  },
  methods: {
    register(){
      axios.post('http://localhost:3000/user/signup', {username: this.username, password: this.password})
        .then(
          () => {
            
              this.msg = 'success'
              this.username = ''
              this.password = ''

            
          }
        )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
