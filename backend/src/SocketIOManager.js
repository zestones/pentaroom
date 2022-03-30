// set the number of previous drawers to keep in the history
const NB_SAVED_DRAWERS = 3

class SocketIOManager {
  constructor(io, dictionaryManager) {
    this.users = []
    this.io = io
    this.dictionaryManager = dictionaryManager
    this.previousDrawers = []
    this.currentWord = null
  }

  /**
   * Initialize the socket connection, allow new users
   */
  init() {
    this.io.on('connection', (socket) => this.connection(socket))
  }

  /**
   * Call on every first connection from an external device
   * @param {*} socket : the socket object symbolizing the user
   */
  connection(socket) {
    console.log(`+ : ${socket.id}`)

    this.postUser(socket)

    socket.on('disconnect', () => this.disconnection(socket))
    socket.on('update-user', (user) => this.updateUserById(user.id, user))
    socket.on('message', (message) => this.io.emit('message', message))
    socket.on('draw', (drawObject) => this.io.emit('draw', drawObject))
    socket.on('check-word', (word, success, failure) => this.checkWord(word, success, failure))
    socket.on('update-drawer', () => this.updateDrawer())
    socket.on('accept-challenge', (chosenWord) => this.updateCurrentWord(chosenWord))
    socket.on('refuse-challenge', () => this.updateDrawer())
  }

  /**
   * Call on every disconnection from an external device already connected
   * @param {*} socket : the socket object symbolizing the user
   */
  disconnection(socket) {
    console.log(`- : ${socket.id}`)
    this.deleteUserById(socket.id)
  }

  /**
   * Post a new user in the list of users
   * @param {*} socket
   */
  postUser(socket) {
    const newUser = {
      id: socket.id,
      pseudo: '',
      avatar: undefined,
      score: 0,
    }
    this.users.push(newUser)
    this.globalEmitUsers()
  }

  /**
   * Return an user with its id
   * @param {int} id the id of the user to get
   * @returns the user object or null
   */
  getUserById(id) {
    const index = this.users.map((user) => user.id).indexOf(id)

    if (index === -1) return null

    return this.users[index]
  }

  /**
   * Update an user with its id
   * @param {int} id the id of the user to update
   * @param {*} newUser the user object to assign to the old user
   * @returns
   */
  updateUserById(id, newUser) {
    const user = this.getUserById(id)
    if (!user) return

    user.pseudo = newUser.pseudo
    user.avatar = newUser.avatar
    this.globalEmitUsers()
  }

  /**
   * Remove an user with its id
   * @param {int} id the id uf the user to delete
   */
  deleteUserById(id) {
    this.users = this.users.filter((user) => user.id !== id)
    this.globalEmitUsers()
  }

  /**
   * Update the current word
   * @param {string} word
   */
  updateCurrentWord(word) {
    this.currentWord = word
  }

  /**
   * Return a random user
   * @returns a random user
   */
  getRandomDrawer() {
    // get all available users in the list of users
    // an available user is a logged user (with avatar and pseudo)
    // AND an user not chosen in the past
    const availableUsers = this.users.filter((user) => user.pseudo !== '' && user.avatar !== undefined && this.previousDrawers.indexOf(user.id) === -1)

    // if there is no available user
    if (availableUsers.length === 0) return null

    // get random user
    const randomUser = availableUsers[Math.floor(Math.random() * (availableUsers.length))]

    // add the new user to previousDrawers
    this.previousDrawers.push(randomUser.id)
    // if the limit of previousDrawers is reach, the last one is removed
    if (this.previousDrawers.length > NB_SAVED_DRAWERS) this.previousDrawers.shift()

    // the random user is returned
    return randomUser
  }

  /**
   * Select a new drawer and send him the challenge request
   * @returns
   */
  updateDrawer() {
    // reinitialize the current word
    this.currentWord = undefined

    // get a random user
    const user = this.getRandomDrawer()

    // if there is no user available
    if (!user) return

    // get random words
    const words = this.dictionaryManager.getRandomWords()

    // send the request
    this.io.emit('challenge', user.id, words)
  }

  /**
   * Compare the current word and the proposed word
   * @param {string} word the proposed word
   * @param {function} success the success callback
   * @param {function} failure the failure callback
   * @returns
   */
  checkWord(word, success, failure) {
    if (!this.currentWord) failure()

    if (word.toLower() === this.currentWord.toLower()) {
      success()
    } else {
      failure()
    }
  }

  /**
   * Send a message to connected users containing an updated liste of all users
   */
  globalEmitUsers() {
    this.io.emit('update-users', this.users)
  }
}

module.exports = SocketIOManager
