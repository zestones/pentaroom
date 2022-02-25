import React, { useState, useEffect } from 'react'
import './App.css'
import io from 'socket.io-client'
import PropTypes from 'prop-types'

import Canvas from './components/canvas/Canvas'
import Container from './components/Container'
import ListUsers from './components/listUsers/ListUsers'
import UserInfos from './components/userInfos/UserInfos'

const SERVER = process.env.REACT_APP_ENDPOINT || 'http://127.0.0.1:8080'

function App(props) {
  // define the props type
  App.propTypes = {
    userRole: PropTypes.node.isRequired,
  }

  // init all the used variables
  const { userRole } = props
  const [socket, setSocket] = useState(null)
  const [isConnected, setConnected] = useState(false)
  const [users, setUsers] = useState([])

  // initialize the socket IO connection
  useEffect(() => {
    setSocket(io(SERVER))
  }, [])

  // Socket IO Client Manager
  useEffect(() => {
    if (!socket) return
    socket.on('connect', () => setConnected(true))
    socket.on('updateUsers', (listUsers) => setUsers(listUsers))
    socket.on('disconnect', () => setConnected(false))
  }, [socket])

  // return our application
  return (
    <div className="App">
      <Container>
        <Canvas />
      </Container>
      <UserInfos userRole={userRole} isConnected={isConnected} />
      <ListUsers users={users} />
    </div>
  )
}
export default App
