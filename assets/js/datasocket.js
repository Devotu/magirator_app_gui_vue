
import { Socket } from "phoenix"

function init(username, password) {
  console.log("initating socket")
  
  return new Socket(
    "ws://localhost:4000/socket",
    {
      params: {
        user: username,
        pwd: password
      }
    }
  )
}


function connect(socket) {
  console.log("connecting to socket")

  socket.connect()

  return socket
}

export { init, connect }