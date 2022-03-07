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
    console.log(`+ : ${socket.id}`)
    this.users.push({ id: socket.id, pseudo: '' })
    this.globalEmitUsers()
    socket.on('registration', (user) => this.registration(user))
    socket.on('disconnect', () => this.disconnection(socket))
    socket.on('new-message', (message) => this.globalEmitMessage(message))
    socket.on('draw', (drawObject) => this.globalEmitDraw(drawObject))
  }

  registration(user) {
    console.log(`Updtate => id :  ${user.id} pseudo :${user.pseudo}`)
    const index = this.users.map((x) => x.id).indexOf(user.id)
    this.users[index].pseudo = user.pseudo
    this.globalEmitUsers()
  }

  /**
   * Call on every disconnection from an external device already connected
   * @param {any} socket : the socket object symbolizing the user
   */
  disconnection(socket) {
    console.log(`- : ${socket.id}`)
    this.users = this.users.filter((user) => user.id !== socket.id)
    this.globalEmitUsers()
  }

  /**
   * Send a message to connected users containing the new message received
   * @param {any} message : the new message received
   */
  globalEmitMessage(message) {
    this.io.emit('new-message', message)
  }

  /**
   * Send a message to connected users containing an updated liste of all users
   */
  globalEmitUsers() {
    this.io.sockets.emit('update-users', this.users)
  }

  /**
   * Send a message to connected users containing the draw object
   */
  globalEmitDraw(drawObject) {
    this.io.sockets.emit('draw', drawObject)
  }
}

module.exports = SocketIOManager
