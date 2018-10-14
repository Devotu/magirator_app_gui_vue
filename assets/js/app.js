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

// import { Socket } from "phoenix"
import axios from 'axios'
import Vue from 'vue'
// import { join } from "./datachannel"
// import socket from "./socket"
import { connect, init } from "./datasocket";

// let socket = new Socket("ws://localhost:4000/socket", {params: {}})

// join( "x", "y")

new Vue({
  el: '#mr',
  data: {
    socket: {},
    username: 'Usery',
    password: 'Pwdz',
    token: ""
  },
  methods: {
    tryit: function(){console.log("test")},
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






// let channel = socket.channel("app:xx", {})
// channel.join()
//   .receive("ok", resp => { console.log("Joined xx successfully", resp) })
//   .receive("error", resp => { console.log("Unable to join xx", resp) })


