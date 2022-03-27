require('dotenv').config()

const PORT = process.env.PORT || 8080

const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: true,
  origin: ['*', '*:*', 'http://pentaroomio.jkhq4735.odns.fr', 'http://pentaroomio.jkhq4735.odns.fr:*'],
})

// get socket io manager
const SocketIOManager = require('./SocketIOManager')
const DictionaryManager = require('./DictionaryManager')

const dictionaryManager = new DictionaryManager()
const socketManager = new SocketIOManager(io, dictionaryManager)

// init the dictionary
dictionaryManager.initDictionary()

// init the socket connexion
socketManager.init()

// open the server
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
