<template>
  <div class="hello">
    
    <h2>Login</h2>
    <input type="text" v-model="username" placeholder="username">
    <br>
    <br>
    <input type="text" v-model="password" placeholder="password">

    <br><br>

    <button @click="login()">Login</button>

  </div>
</template>

<script>

let axios = require('axios')
let Cookie = require('js-cookie')

export default {

  

  name: 'HelloWorld',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login(){

      axios.post('http://localhost:3000/user/signin', {username: this.username, password: this.password})
        .then(
          (res) => {
            Cookie.set('token', res.data.token)
          }
        ).catch(
          err => {
            if (err) console.log(err)
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
