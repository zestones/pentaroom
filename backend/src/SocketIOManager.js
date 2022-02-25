class SocketIOManager {
  constructor(io) {
    this.users = []
    this.io = io
  }

  /**
   * Initialize the socket connection, allow new users
   */
  init() {
    this.io.on('connection', (socket) => this.connection(socket))
  }

  /**
   * Call on every first connection from an external device
   * @param {any} socket : the socket object symbolizing the user
   */
  connection(socket) {
    this.users.push({ id: socket.id })

    this.globalEmitUsers()

    console.log(`New user : ${socket.id}`)

    socket.on('disconnect', () => this.deconnection(socket))
  }

  /**
   * Call on every deconnection from an external device already connected
   * @param {any} socket : the socket object symbolizing the user
   */
  deconnection(socket) {
    console.log(`Socket ${socket.id} disconnected.`)
    this.users.filter((user) => user.id !== socket.id)
    this.globalEmitUsers()
  }

  /**
   * Send a message to connected users containing an updated liste of all users
   */
  globalEmitUsers() {
    this.io.sockets.emit('updateUsers', this.users)
  }
}

module.exports = SocketIOManager
