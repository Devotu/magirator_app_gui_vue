// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
import axios from 'axios'
import Vue from 'vue'
import { init, join } from './datasocket'


new Vue({
  el: '#mr',
  data: {
    socket: {},
    username: 'Usery',
    password: 'Pwdz',
    token: ""
  },
  methods: {
    login: function(){
      console.log("login")
      axios.get("http://localhost:4000/api/token/" + this.username + "/" + this.password)
      .then(
        response=> {
          console.log(response)
          if (response.data.result === "ok") {
            console.log(response.data.token)
            this.token = response.data.token
            console.log(this.token)
            this.socket = join(this.socket, this.token)
          }
          else {
            console.log(response.data.result)
          }
        })
      .catch(err=>console.log(err))
    },
    joinData: function(){

      this.socket = undefined
      this.socket = init(this.username, this.password)

      console.log("connecting")
      this.socket.connect()

      this.socket.onError( () => {
        console.log("errorrrr. disconnecting.") 
        this.socket.disconnect()
       })
    },
    getToken: function(){
      axios.get("http://localhost:4000/api/token/" + this.username + "/" + this.password)
      .then(
        response=> {
          console.log(response)
          if (response.data.result === "ok") {
            console.log(response.data.token)
            this.token = response.data.token
          }
          else {
            console.log(response.data.result)
          }
        })
      .catch(err=>console.log(err))
    }
  }
});

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".