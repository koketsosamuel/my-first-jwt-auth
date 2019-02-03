<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <component v-bind:is="component"></component>
    <br>
    <br>
    <button @click="changeView('HelloWorld')">Login</button> <button @click="changeView('HelloWorld2')">Register</button> <button @click="goHome">Home</button> <button @click="logout()">Logout</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HelloWorld2 from './components/HelloWorld2.vue'
import axios from 'axios'
import Cookie from 'js-cookie'





export default {
  name: 'app',
  components: {
    HelloWorld, HelloWorld2
  },
  data(){
    return {
      component : 'HelloWorld'
    }
  },
   
  
  methods: {
    changeView(view) {
      this.component = view
    },

    async goHome() {

      axios.defaults.headers.common['Authorization'] = await `Bearer ${Cookie.get('token')}`


      axios.get('http://localhost:3000/')
        .then(
          (res) => {
            console.log(res.data)
          } 
        ).catch(err => {
          console.log(err)
        })
    },

    logout() {
      Cookie.remove('token')
      alert('logged out')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
