/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react'

import Header from '../components/Header/Header'
import Login from '../components/Login/Login'
import UserInput from '../components/UserInput/UserInput'
import ChatInput from '../components/ChatInput/ChatInput'
import Drawer from '../components/Drawer/Drawer'
import { SocketContext } from '../context/socket'

function ClientView() {
  const socket = useContext(SocketContext)

  const [user, setUser] = useState({
    pseudo: '',
    avatar: undefined,
    score: 0,
  })

  const [isLogged, setIsLogged] = useState(false)
  const [isChallenged, setIsChallenged] = useState(false)

  const [words, setWords] = useState([])

  const handleUpdateDrawer = (userId, randomWords) => {
    if (userId !== socket.id) {
      setIsChallenged(false)
    } else {
      setIsChallenged(true)
      setWords(randomWords)
    }
  }

  const handleUpdateUser = (newUser) => setUser(newUser)

  useEffect(() => {
    console.log(isLogged)
    if (isLogged) {
      socket.on('challenge', handleUpdateDrawer)
      socket.on('user-updated', handleUpdateUser)
    }

    return () => {
      socket.off('challenge', handleUpdateDrawer)
      socket.off('user-updated', handleUpdateUser)
    }
  }, [socket, isLogged])

  return (
    <>
      <Header type={isChallenged ? 'in-line' : 'in-column'} />
      {
        isLogged
          ? (
            <>
              <ChatInput />
              {isChallenged
                ? (
                  <Drawer
                    setIsChallenged={setIsChallenged}
                    words={words}
                  />
                )
                : <UserInput user={user} />}
            </>
          )
          : <Login setIsLogged={setIsLogged} />
      }
    </>
  )
}
export default ClientView
