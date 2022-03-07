/* eslint-disable import/no-named-as-default-member */
import React, { useState, useEffect } from 'react'
import './App.css'
import io from 'socket.io-client'
import ServerView from './components/ServerView/ServerView'
import Login from './components/login/Login'

const SERVER = process.env.REACT_APP_ENDPOINT || 'http://localhost:8080'

function App({ initialUserRole }) {
  // init all the used variables
  const [socket, setSocket] = useState(null)
  const [isConnected, setConnected] = useState(false)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const [userRole, setUserRole] = useState(initialUserRole)

  const events = {
    connect: 'connect',
    disconnect: 'disconnect',
    updateUsers: 'update-users',
    newMessage: 'new-message',
    registration: 'registration',
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
    socket.on(events.registration, (user) => setUsers(user))
    socket.on(events.updateUsers, (listUsers) => setUsers(listUsers))
    socket.on(events.newMessage, (message) => {
      setMessages((oldMessages) => [...oldMessages, {
        ...message,
        isOwner: message.senderId === socket.id,
      }])
    })
  }, [socket])

  // return our application
  return (
    userRole === 'server' ? <ServerView socket={socket} /> : <Login setUserRole={setUserRole} socket={socket} isConnected={isConnected} users={users} messages={messages} />
  )
}
export default App
