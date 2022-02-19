import React, { useState, useEffect } from 'react'
import './App.css'
import socketClient from 'socket.io-client'

// require the server url
const SERVER = process.env.REACT_APP_ENDPOINT || 'http://127.0.0.1:8080'

function App() {
  let socket

  const [connected, setConnected] = useState(false)
  const getStatusStr = () => ((connected) ? 'Connecté.' : 'Non connecté.')

  useEffect(() => {
    socket = socketClient(SERVER)
    socket.on('connection', () => {
      console.log('I\'m connected with the back-end')
      setConnected(true)
    })
  })

  return (
    <div className="App">
      <h1>Socket IO avec React</h1>
      <h2>
        Status:
        {' '}
        {getStatusStr()}
        {' '}
      </h2>
    </div>
  )
}

export default App
