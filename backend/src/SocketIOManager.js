const uniqid = require('uniqid')
const UsersManager = require('./UsersManager')
const ServersManager = require('./ServersManager')

const TIMER_DURATION = 45
const TIME_BEFORE_DISCOVER = 10
const PERCENT_WINNERS_BEFORE_END = 10 / 100
let interval

const throwError = (message) => {
  console.error(`Error - ${message}`)
}

class SocketIOManager {
  constructor(io, dictionaryManager) {
    this.io = io
    this.dictionaryManager = dictionaryManager
    this.currentWord = null
    this.winnerUsers = []
    this.servers = []
    this.usersManager = new UsersManager()
    this.serversManager = new ServersManager()
    this.drawer = null
    this.runLeft = 5
    this.lastRun = false
    this.letterDiscovered = []
    this.timeLeftBeforeDiscover = TIME_BEFORE_DISCOVER
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

    socket.on('disconnect', () => this.disconnection(socket))
    socket.on('new-user', (user) => this.newUser(socket, user))
    socket.on('message', (message) => this.postMessage(socket, message))
    socket.on('reload', (runLeft) => this.reload(runLeft))
    socket.on('run-left', (runLeft) => { this.runLeft = runLeft; this.lastRun = false })
    socket.on('scores', () => { socket.emit('scores', this.usersManager.users) })

    socket.on('draw', (drawObject) => {
      this.serversManager.serversEmit('draw', drawObject)
    })

    socket.on('check-word', (word) => this.checkWord(socket, word))
    socket.on('update-drawer', () => this.updateDrawer())
    socket.on('accept-challenge', (chosenWord) => this.updateCurrentWord(socket, chosenWord))
    socket.on('refuse-challenge', () => this.updateDrawer())
    socket.on('new-drawer', () => this.updateDrawer())
    socket.on('is-server', () => this.serversManager.postServer(socket, this.currentWord, this.usersManager.users))
    socket.on('get-users', () => this.usersManager.getUsers(socket, this.drawer))
  }

  reload(runLeft) {
    console.log('reload')
    this.winnerUsers = []
    this.currentWord = null
    clearInterval(interval)
    if (this.drawer) {
      this.drawer.emit('update-drawer', { userId: null, words: [] })
    }
    this.drawer = null

    this.runLeft = runLeft
    this.lastRun = false

    this.updateDrawer()
  }

  newUser(socket, user) {
    console.log('new user...')
    const newUser = this.usersManager.postUser(socket, user)

    if (newUser === null) {
      console.log('...pseudo already used')
      socket.emit('pseudo-taken', true)
    } else {
      console.log('...pseudo available !')
      socket.emit('pseudo-taken', false)
      socket.emit('user-updated', user)
      this.serversManager.serversEmit('update-users', this.usersManager.users)
      if (this.currentWord) {
        socket.emit('temp-chosen-word', this.currentWord)
      }
    }
  }

  /**
     * Call on every disconnection from an external device already connected
     * @param {*} socket : the socket object symbolizing the user
     */
  disconnection(socket) {
    console.log(`- : ${socket.id}`)
    this.usersManager.deleteUserById(socket.id)
    this.serversManager.deleteServerById(socket.id)

    this.serversManager.serversEmit('update-users', this.usersManager.users)

    if (this.usersManager.users.length < 2) {
      this.currentWord = null
      clearInterval(interval)
      this.io.emit('end-game')
    }

    if (this.drawer && socket.id === this.drawer.id) {
      this.serversManager.serversEmit('challenge', { userId: null })
      this.updateDrawer()
    }
  }

  postMessage(socket, message) {
    this.serversManager.serversEmit('message', {
      id: uniqid(),
      body: message,
      time: new Date(),
      owner: this.usersManager.getUserById(socket.id),
    })
  }

  /**
     * Update the current word
      // ? SOCKET ?
     * @param {string} word
     */
  updateCurrentWord(socket, word) {
    this.letterDiscovered = []

    this.runLeft -= 1
    if (this.runLeft <= 0) {
      this.lastRun = true
    }

    this.currentWord = word
    console.log(`Mot à deviner: ${this.currentWord}`)
    socket.emit('temp-chosen-word', word)
    this.usersManager.usersEmit('temp-chosen-word', word)

    this.serversManager.serversEmit('music-challenge', true)
    let timer = TIMER_DURATION
    interval = setInterval(() => {
      timer -= 1

      this.timeLeftBeforeDiscover -= 1
      if (this.timeLeftBeforeDiscover <= 0) {
        this.timeLeftBeforeDiscover = TIME_BEFORE_DISCOVER
        if (this.letterDiscovered.length < this.currentWord.length) {
          let availableLetters = []
          for (let i = 0; i < this.currentWord.length; i += 1) {
            availableLetters.push(i)
          }
          availableLetters = availableLetters.filter(
            (indexLetter) => this.letterDiscovered.indexOf(indexLetter) === -1,
          )
          const randomIndexLetter = availableLetters[
            Math.floor(
              Math.random() * (availableLetters.length),
            )]
          this.letterDiscovered.push(randomIndexLetter)
          this.io.emit('discover-letter', randomIndexLetter)
        }
      }

      if (timer < 0) {
        socket.emit('no-time-left', timer)
        this.serversManager.serversEmit('no-time-left', timer)
        clearInterval(interval)
      } else {
        socket.emit('time-left', timer)
        this.serversManager.serversEmit('time-left', timer)
      }
    }, 1000)
  }

  /**
     * Select a new drawer and send him the challenge request
     * @returns
     */
  updateDrawer() {
    if (this.lastRun) {
      clearInterval(interval)
      this.io.emit('end-game')
      return
    }
    // reinitialize the list of winners
    this.winnerUsers = []

    const previousDrawer = this.drawer

    this.drawer = null

    // reinitialize the current word
    this.currentWord = undefined

    // clear the timer interval
    clearInterval(interval)

    this.io.emit('temp-chosen-word', 'aucun mot')

    // get a random user
    this.drawer = this.usersManager.getRandomDrawer()

    console.log(`new drawer : ${this.drawer ? this.drawer.id : null}`)

    // if there is no user available
    if (this.drawer === null) {
      throwError('(updateDrawer) no random user available')
      return
    }

    // get random words
    const words = this.dictionaryManager.getRandomWords()

    // send the request
    this.drawer.emit('challenge', { userId: this.drawer.id, words })
    this.serversManager.serversEmit('challenge', { userId: this.drawer.id })

    if (previousDrawer && this.drawer.id !== previousDrawer.id) {
      previousDrawer.emit('challenge', { userId: this.drawer.id, words: [] })
    }
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

    if (word.trim().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '') !== this.currentWord.trim().toLowerCase().normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')) {
      socket.emit('failure-word')
      return
    }

    const user = this.usersManager.getUserById(socket.id)

    if (user === null) {
      throwError('(checkWord) user not found')
      return
    }

    // check if the user has already found the word
    if (this.winnerUsers.some((userId) => userId === user.id)) {
      socket.emit('word-already-found')
      return
    }

    user.score += this.usersManager.users.length - this.winnerUsers.length
    this.winnerUsers.push(user.id)

    socket.emit('success-word')
    socket.emit('user-updated', user)
    this.serversManager.serversEmit('update-users', this.usersManager.users)

    if (
      (this.usersManager.users.length - 1) * PERCENT_WINNERS_BEFORE_END <= this.winnerUsers.length
    ) {
      this.updateDrawer()
    }
  }
}

module.exports = SocketIOManager
