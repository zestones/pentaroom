class ServersManager {
  constructor() {
    this.servers = []
  }

  serversEmit(event, data) {
    this.servers.forEach((server) => {
      server.emit(event, data)
    })
  }

  postServer(socket, currentWord, users) {
    console.log(`new server (isInGame : ${currentWord !== null})`)
    this.servers.push(socket)
    socket.emit('init-server', {
      isInGame: currentWord !== null,
      users,
    })
  }

  deleteServerById(id) {
    this.servers = this.servers.filter((server) => server.id !== id)
  }
}

module.exports = ServersManager
