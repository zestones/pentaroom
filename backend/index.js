// require dotenv to use .env variables
require('dotenv').config()
// require server
const app = require('express')()
const http = require('http').createServer(app)

// require port
const { PORT } = process.env || 8080

// require socketio
const io = require('socket.io')(http, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
})

// detect socket connection
io.on('connection', (socket) => {
  console.log('new client connected')
  socket.emit('connection', null)
})

// open the server
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
