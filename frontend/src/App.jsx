import React, { useState, useEffect } from 'react'
import './App.css'
import io from 'socket.io-client'
import PropTypes from 'prop-types'

import { v4 as uuid } from 'uuid'
import Canvas from './components/canvas/Canvas'
import Container from './components/Container'

import Drawer from './components/drawer/Drawer'
import Chat from './components/chat/Chat'

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
  const [messages, setMessages] = useState([])

  const events = {
    connect: 'connect',
    disconnect: 'disconnect',
    updateUsers: 'update-users',
    newMessage: 'new-message',
  }

  // initialize the socket IO connection
  useEffect(() => {
    const newSocket = io(SERVER)
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

  // Socket IO Client Manager
  useEffect(() => {
    if (!socket) return
    socket.on(events.connect, () => setConnected(true))
    socket.on(events.disconnect, () => setConnected(false))
    socket.on(events.updateUsers, (listUsers) => {
      console.log('new list of users')
      console.log(listUsers)
      setUsers(listUsers)
    })
    socket.on(events.newMessage, (message) => {
      const incomingMessage = {
        ...message,
        isOwner: message.senderId === socket.id,
      }
      // send the new message to the others in the same room.
      const newMessages = [...messages, incomingMessage]
      setMessages(newMessages)
    })
  }, [socket, messages, setUsers])

  // send the messagee along with a sender id
  const sendMessage = (messageBody) => {
    if (!socket) return
    socket.emit(events.newMessage, {
      id: uuid(),
      body: messageBody,
      senderId: socket.id,
    })
  }

  // return our application
  return (
    <div className="App">
      <Container>
        <Canvas />
      </Container>

      <Drawer username={socket?.id} userRole={userRole} isConnected={isConnected} users={users}>
        <Chat messages={messages} sendMessage={sendMessage} />
      </Drawer>
    </div>
  )
}
export default App
