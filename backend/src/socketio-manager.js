function launch(socket, listUsers) {
  if (listUsers.length < 2) {
    socket.emit('error-not-enough-users')
    return
  }
  const randomUser = listUsers[Math.floor(Math.random() * listUsers.length)]
  console.log(`User chosen: ${randomUser.id}`)
}

module.exports = { launch }
