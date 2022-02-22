require('dotenv').config()

const cors = require('cors')
const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
app.use(cors())
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
})

const { PORT } = process.env || 8080

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
httpServer.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
