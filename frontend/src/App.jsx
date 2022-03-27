/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-named-as-default-member */
import React, { useState, useEffect } from 'react'
import './App.css'
import io from 'socket.io-client'
import ServerView from './components/ServerView/ServerView'
import UserView from './components/UserView/UserView'
import HomePage from './pages/HomePage/HomePage'

const SERVER = process.env.REACT_APP_ENDPOINT || 'http://localhost:8080'

function App({ initialUserRole }) {
  // init all the used variables
  const [socket, setSocket] = useState(null)
  const [isConnected, setConnected] = useState(false)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [hiddenWord, setHiddenWord] = useState()
  const [userDrawer, setDrawer] = useState()

  const [userRole, setUserRole] = useState(initialUserRole)

  const [isRegistered, setRegistered] = useState(false)
  const [response, setReponse] = useState()

  const events = {
    connect: 'connect',
    disconnect: 'disconnect',
    updateUsers: 'update-users',
    newMessage: 'new-message',
    findWord: 'find-word',
    drawerUsers: 'drawer-users',
    registration: 'registration',
    reponseProp: 'response-proposition',
  }

  // initialize the socket IO connection
  useEffect(() => {
    const newSocket = io(SERVER)
    setSocket(newSocket)
    return () => newSocket.close()
  }, [])

  // Socket IO Client Manager
  useEffect(() => {
    if (!socket) return
    socket.on(events.connect, () => setConnected(true))
    socket.on(events.disconnect, () => setConnected(false))

    socket.on(events.findWord, (word) => setHiddenWord(word))
    socket.on(events.registration, (user) => setUsers(user))
    socket.on(events.updateUsers, (listUsers) => setUsers(listUsers))
    socket.on(events.drawerUsers, (drawer) => setDrawer(drawer))

    socket.on(events.newMessage, (message) => {
      setMessages((oldMessages) => [...oldMessages, {
        ...message,
        isOwner: message.senderId === socket.id,
      }])
    })
    socket.on(events.reponseProp, (rep) => {
      setReponse(rep)
    })
  }, [socket])

  // return our application
  return (

    userRole === 'server'
      ? (
        <ServerView
          socket={socket}
          users={users}
          userRole={userRole}
          messages={messages}
          userDrawer={userDrawer}
        />
      )
      : (isRegistered
        ? (
          <UserView
            setUserRole={setUserRole}
            socket={socket}
            isConnected={isConnected}
            users={users}
            messages={messages}
            hiddenWord={hiddenWord}
            userDrawer={userDrawer}
            response={response}
          />
        )

        : <HomePage socket={socket} setRegistered={setRegistered} />
      )
  )
}
export default App
