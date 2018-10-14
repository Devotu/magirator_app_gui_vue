function join(username, password) {
  console.log("un: " + username + " pwd: " + password)

  let channel = socket.channel("app:xx", {})
  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })
}

function pushData(data) {
  channel.push("deck:list", { x: data })
}

export { join }