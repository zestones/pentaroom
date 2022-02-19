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

const listUsers = []

// detect socket connection
io.on('connection', (socket) => {
  listUsers.push(socket)

  console.log(`New user : ${socket.id}`)

  socket.emit('connection', null)

  socket.on('launch', () => socketioManager.launch(socket, listUsers))

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`)
  })
})

// open the server
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
