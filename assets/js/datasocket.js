
import { Socket } from "phoenix"
// import { axios } from 'axios'


function getToken() {
  axios.get("http://localhost:4000/api/token/" + this.username + "/" + this.password)
    .then(
      response => {
        console.log(response)
        if (response.data.result === "ok") {
          console.log(response.data.token)
          return response.data.token
        }
        else {
          console.log(response.data.result)
          return ""
        }
      })
    .catch(err => console.log(err))
}

function join(socket, token) {

  socket = init(token)
  socket.connect()

  socket.onError(() => {
    console.log("error. disconnecting.")
    socket.disconnect()
    socket = null
  })

  return socket
}


function init(token) {
  console.log("initating socket")

  return new Socket(
    "ws://localhost:4000/socket",
    {
      params: {
        token: token
      }
    }
  )
}

export { getToken, init, join }