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
import 'phoenix_html'
import { Socket } from 'phoenix'
import Vue from 'vue'
import axios from 'axios'

new Vue({
  el: '#mr',
  data: {
    socket: {},
    channel: {},
    username: 'Adam',
    password: 'Hemligt',
    token: "",
    feedback: ""
  },
  methods: {
    login: function() {
      axios.get("http://localhost:4000/api/token/" + this.username + "/" + this.password)
        .then(
          response => {
    
            console.log(response)
    
            if (response.data.result === "ok") {
              console.log(response.data.token)
              let token = response.data.token
    
              this.socket = new Socket(
                "ws://localhost:4000/socket",
                {
                  params: {
                    token: token
                  }
                }
              )
    
              this.socket.connect()
    
              this.socket.onError(() => {
                console.log("error. disconnecting.")
                socket.disconnect()
                return null
              })
    
              this.channel = this.socket.channel("app:xx", {})
              this.channel.join()
                .receive("ok", resp => { console.log("Joined successfully", resp) })
                .receive("error", resp => { console.log("Unable to join", resp) })
            }
            else {
              console.log(response.data.result)
              return null
            }
    
          })
        .catch(err => console.log(err))
    },
    tryit: function(){

      console.log("pushing")
      this.channel.push("deck:list", { x: "y" })
    }
  }
});

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".