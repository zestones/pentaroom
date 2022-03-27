class SocketIOManager {
  constructor(io, dictionaryManager) {
    this.users = []
    this.io = io
    this.dictionaryManager = dictionaryManager
    this.drawer = {}
    this.findWord = ''
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
    this.users.push({ id: socket.id, pseudo: '', avatar: undefined })
    this.globalEmitUsers()
    socket.on('registration', (user) => this.registration(user))
    socket.on('disconnect', () => this.disconnection(socket))
    socket.on('new-message', (message) => this.globalEmitMessage(message))
    socket.on('draw', (drawObject) => this.globalEmitDraw(drawObject))
    socket.on('find-word', (findWord) => this.globalEmitWord(findWord))
    socket.on('drawer-users', (drawerUsers) => this.globalEmitDrawerUsers(drawerUsers))
    socket.on('proposed-word', (finder) => this.checkProposedWord(finder))
  }

  /**
   * check if the user finded the word and send a reponse
   * @param {*} finder
   */
  checkProposedWord(finder) {
    const userID = finder.id
    const finded = finder.word.toUpperCase() === this.findWord.toUpperCase()

    this.io.sockets.emit('response-proposition', { id: userID, status: finded })
  }

  /** Register a new user */
  registration(user) {
    console.log(`Update => id :  ${user.id} pseudo :${user.pseudo}`)
    const index = this.users.map((x) => x.id).indexOf(user.id)
    this.users[index].pseudo = user.pseudo
    this.users[index].avatar = user.avatar
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
   * Send a message to connected users containing the new drawer user id
   * and a list of 3 words
   * @param {*} newDrawer : the new user Drawer
   */
  globalEmitDrawerUsers(newDrawer) {
    const words = this.dictionaryManager.getRandomWords()
    this.drawer = { id: newDrawer.id, words }
    this.io.sockets.emit('drawer-users', this.drawer)
  }

  /**
   * Send a message to connected users containing the new word
   * @param {*} newWord : the new word
   */
  globalEmitWord(newWord) {
    this.findWord = newWord
    this.io.sockets.emit('find-word', newWord) // ! Not needed, just for testing
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
