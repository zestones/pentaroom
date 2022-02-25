class SocketIOManager {
  constructor(io) {
    this.users = []
    this.io = io
  }

  init() {
    this.io.on('connection', (socket) => this.connexion(socket))
  }

  connexion(socket) {
    this.users.push(socket.id)

    this.globalEmitUsers()

    console.log(`New user : ${socket.id}`)

    socket.on('disconnect', () => this.deconnexion(socket))
  }

  deconnexion(socket) {
    console.log(`Socket ${socket.id} disconnected.`)
    this.users.filter((user) => user !== socket.id)
    this.globalEmitUsers()
  }

  globalEmitUsers() {
    this.io.sockets.emit('updateUsers', this.users)
  }
}

module.exports = SocketIOManager
