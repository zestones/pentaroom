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
    this.users.push({ id: socket.id })
    this.globalEmitUsers()
    socket.on('disconnect', () => this.disconnection(socket))
    socket.on('new-message', (message) => this.globalEmitMessage(message))
    socket.on('draw', (drawObject) => this.globalEmitDraw(drawObject))
    socket.on('find-word', (findWord) => this.globalEmitWord(findWord))
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
   * Send a message to connected users containing the new word
   * @param {*} newWord : the new word
   */
  globalEmitWord(newWord) {
    this.io.sockets.emit('find-word', newWord)
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
