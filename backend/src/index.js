require('dotenv').config()
const app = require('express')()
const http = require('http').createServer(app)

const { PORT } = process.env || 8080

const io = require('socket.io')(http, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
})

const socketioManager = require('./socketio-manager')

const users = []

function updateUsers() {
  io.sockets.emit('updateUsers', users)
}

// detect socket connection
io.on('connection', (socket) => {
  users.push(socket.id)

  updateUsers()

  console.log(`New user : ${socket.id}`)

  socket.on('launch', () => socketioManager.launch(socket, users))

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`)
    users.filter((user) => user !== socket.id)
    updateUsers()
  })
})

// open the server
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
