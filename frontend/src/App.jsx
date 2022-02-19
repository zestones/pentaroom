import React, { useState, useEffect } from 'react'
import './App.css'
// import socketClient from 'socket.io-client'
import io from 'socket.io-client'

// require the server url
const SERVER = process.env.REACT_APP_ENDPOINT || 'http://127.0.0.1:8080'

function App() {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState({ isActive: false, message: '' })
  const getStatusStr = () => ((connected) ? 'Connecté.' : 'Non connecté.')

  useEffect(() => {
    setSocket(io(SERVER))
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))
    socket.on('error-not-enough-users', () => setError({ isActive: true, message: 'Pas assez d\'utilisateur' }))
  }, [socket])

  const launchGame = () => {
    if (!socket) {
      console.log('Error - Socket is null')
      return
    }
    console.log('Lancement de la partie ?')
    socket.emit('launch')
  }

  return (

    <div className="App">
      <h1>Socket IO avec React</h1>
      <h2>
        Status:
        {' '}
        {getStatusStr()}
        {' '}
      </h2>
      <button type="button" onClick={launchGame}>Launch game</button>
      {error.isActive && <div className="error">{error.message}</div>}
    </div>
  )
}

export default App
