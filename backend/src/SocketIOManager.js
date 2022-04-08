const uniqid = require('uniqid')

// set the number of previous drawers to keep in the history
const NB_SAVED_DRAWERS = 3
const SCORE_INCREMENT = 5
const TIMER_DURATION = 90
let interval

class SocketIOManager {
  constructor(io, dictionaryManager) {
    this.users = []
    this.io = io
    this.dictionaryManager = dictionaryManager
    this.previousDrawers = []
    this.currentWord = null
    this.winnerUsers = []
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
    socket.on('update-user', (user) => this.updateUserById(socket, user.id, user))
    socket.on('message', (message) => this.postMessage(socket, message))
    socket.on('draw', (drawObject) => this.io.emit('draw', drawObject))
    socket.on('check-word', (word) => this.checkWord(socket, word))
    socket.on('update-drawer', () => this.updateDrawer())
    socket.on('accept-challenge', (chosenWord) => this.updateCurrentWord(socket, chosenWord))
    socket.on('refuse-challenge', () => this.updateDrawer())
    socket.on('new-drawer', () => this.updateDrawer())
  }

  postMessage(socket, message) {
    console.log(this.getUserById(socket.id))
    this.io.emit('message', {
      id: uniqid(),
      body: message,
      time: new Date(),
      owner: this.getUserById(socket.id),
    })
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
  updateUserById(socket, id, newUser) {
    const user = this.getUserById(id)
    if (!user) return

    // check if the pseudo is already used
    if (this.users.some((x) => x.pseudo.toLowerCase() === newUser.pseudo.toLowerCase())) {
      socket.emit('pseudo-taken', true)
    } else {
      user.pseudo = newUser.pseudo
      user.avatar = newUser.avatar

      socket.emit('pseudo-taken', false)
      socket.emit('user-updated', user)

      this.globalEmitUsers()
    }
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
    // ? SOCKET ?
   * @param {string} word
   */
  updateCurrentWord(socket, word) {
    this.currentWord = word
    console.log(`Mot à deviner: ${this.currentWord}`)
    this.io.emit('temp-chosen-word', word)
    this.io.emit('music-challenge', true)
    let timer = TIMER_DURATION
    interval = setInterval(() => {
      timer -= 1
      if (timer < 0) {
        this.io.emit('no-time-left', timer)
        clearInterval(interval)
      } else {
        this.io.emit('time-left', timer)
      }
    }, 1000)
  }

  /**
   * Return a random user
   * @returns a random user
   */
  getRandomDrawer() {
    // get all available users in the list of users
    // an available user is a logged user (with avatar and pseudo)
    // AND an user not chosen in the past

    // uncomment this line after user loggin validation
    let availableUsers = this.users.filter((user) => user.pseudo !== '' && user.avatar !== undefined && this.previousDrawers.indexOf(user.id) === -1)
    if (availableUsers.length === 0) {
      availableUsers = this.users.filter((user) => user.pseudo !== '' && user.avatar !== undefined)
      this.previousDrawers = []
    }
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
    // reinitialise the list of winners
    this.winnerUsers = []

    // reinitialize the current word
    this.currentWord = undefined
    clearInterval(interval)
    this.io.emit('temp-chosen-word', 'aucun mot')

    // get a random user
    const user = this.getRandomDrawer()

    // if there is no user available
    if (!user) return

    // get random words
    const words = this.dictionaryManager.getRandomWords()

    console.log('random drawer user :')
    console.log(user)
    console.log('random words :')
    console.log(words)
    // send the request
    this.io.sockets.emit('challenge', user.id, words)
  }

  /**
   * Compare the current word and the proposed word
   * @param {string} word the proposed word
   * @param {function} success the success callback
   * @param {function} failure the failure callback
   * @returns
   */
  checkWord(socket, word) {
    if (!this.currentWord) {
      socket.emit('undefined-word')
      return
    }

    if (word.toLowerCase() === this.currentWord.toLowerCase()) {
      const user = this.getUserById(socket.id)

      // check if the user has already finded the word
      if (!this.winnerUsers.some((x) => x.id === user.id)) {
        socket.emit('success-word')

        // update the score
        if (this.winnerUsers.length < 4) {
          user.score += SCORE_INCREMENT - this.winnerUsers.length
        } else user.score += 1

        this.winnerUsers.push({ id: user.id, pseudo: user.pseudo, avatar: user.avatar })

        socket.emit('user-updated', user)
      } else (socket.emit('word-already-finded'))

      if (this.users.length - 2 === this.winnerUsers.length) {
        this.updateDrawer()
      }

      this.globalEmitUsers()
    } else {
      socket.emit('failure-word')
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
