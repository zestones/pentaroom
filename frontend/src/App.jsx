import React, { useState, useEffect } from 'react'
import './App.css'
import io from 'socket.io-client'
import PropTypes from 'prop-types'

import Canvas from './components/canvas/Canvas'
import Container from './components/Container'

const SERVER = process.env.REACT_APP_ENDPOINT || 'http://127.0.0.1:8080'

function App(props) {
  App.propTypes = {
    userRole: PropTypes.node.isRequired,
  }
  const { userRole } = props
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState({ isActive: false, message: '' })
  const [users, setUsers] = useState([])
  const getStatusStr = () => ((connected) ? 'Connecté.' : 'Non connecté.')

  useEffect(() => {
    setSocket(io(SERVER))
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on('connect', () => setConnected(true))
    socket.on('updateUsers', (listUsers) => setUsers(listUsers))
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
    <>
      <Container>
        <Canvas />
      </Container>
      <div className="App">
        <h1>
          Socket IO avec React (role:
          {' '}
          { userRole }
          )
        </h1>
        <h2>
          Status:
          {' '}
          {getStatusStr()}
          {' '}
        </h2>
        <div className="users">
          <h2>Liste des users : </h2>
          <ul>
            {users.map((user) => (
              <li>{user}</li>
            ))}
          </ul>
        </div>
        <button type="button" onClick={launchGame}>Launch game</button>
        {error.isActive && <div className="error">{error.message}</div>}
      </div>
    </>
  )
}
export default App
