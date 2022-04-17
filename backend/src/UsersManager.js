// set the number of previous drawers to keep in the history
const NB_SAVED_DRAWERS = 3

class UsersManager {
  constructor() {
    this.users = []
    this.previousDrawers = []
    this.userSockets = []
  }

  usersEmit(event, data) {
    this.userSockets.forEach((user) => {
      user.emit(event, data)
    })
  }

  /**
   * Remove an user with its id
   * @param {int} id the id uf the user to delete
   */
  deleteUserById(id) {
    this.users = this.users.filter((user) => user.id !== id)
    this.userSockets = this.userSockets.filter((socket) => socket.id !== id)
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

  getUserSocketById(id) {
    const index = this.userSockets.map((socket) => socket.id).indexOf(id)

    if (index === -1) return null

    return this.userSockets[index]
  }

  getUsers(socket, drawer) {
    socket.emit('update-users', this.users)
    if (drawer) {
      socket.emit('challenge', { userId: drawer.id, words: [] })
    }
  }

  /**
   * Update an user with its id
   * @param {int} id the id of the user to update
   * @param {*} newUser the user object to assign to the old user
   * @returns
   */
  postUser(socket, newUser) {
    // check if the pseudo is already used
    if (this.users.some((x) => x.pseudo.toLowerCase() === newUser.pseudo.toLowerCase())) {
      return null
    }

    const user = {
      ...newUser,
      id: socket.id,
      score: 0,
    }
    this.users.push(user)
    this.userSockets.push(socket)
    return user
  }

  /**
   * Return a random user
   * @returns a random user
   */
  getRandomDrawer() {
    // get all available users in the list of users
    let availableUsers = this.userSockets.filter(
      (socket) => this.previousDrawers.indexOf(socket.id) === -1,
    )

    if (availableUsers.length === 0) {
      availableUsers = this.userSockets
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
}

module.exports = UsersManager
