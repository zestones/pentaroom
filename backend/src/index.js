require('dotenv').config()

const express = require('express')
const http = require('http')

const PORT = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: true,
  origins: ['*', '*:*'],
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
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
