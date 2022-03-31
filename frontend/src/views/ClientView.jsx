/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react'

import '../App.css'

import Header from '../components/Header/Header'
import Login from '../components/Login/Login'
import UserInput from '../components/UserInput/UserInput'
import Chat from '../components/Chat/Chat'
import Drawer from '../components/Drawer/Drawer'
import SwitchRoleButton from '../components/temp/SwitchRoleButton/SwitchRoleButton'
import { SocketContext } from '../context/socket'

function ClientView() {
  const socket = useContext(SocketContext)

  const [isLogged, setIsLogged] = useState(false)
  const [isChallenged, setIsChallenged] = useState(false)

  const [words, setWords] = useState([])

  const handleUpdateDrawer = (userId, randomWords) => {
    console.log(userId, randomWords, socket.id)
    if (userId !== socket.id) return
    setIsChallenged(true)
    setWords(randomWords)
  }

  useEffect(() => {
    console.log(isLogged)
    if (isLogged) {
      socket.on('challenge', handleUpdateDrawer)
    }

    return () => {
      socket.off('challenge', handleUpdateDrawer)
    }
  }, [socket, isLogged])

  return (
    <>
      <Header styles={isChallenged ? 'in-line' : 'in-column'} />
      {
        isLogged
          ? (
            <>
              <Chat />
              <SwitchRoleButton
                isChallenged={isChallenged}
                setIsChallenged={setIsChallenged}
              />
              {isChallenged
                ? (
                  <Drawer
                    setIsChallenged={setIsChallenged}
                    words={words}
                  />
                )
                : <UserInput />}
            </>
          )
          : <Login setIsLogged={setIsLogged} />
      }
    </>
  )
}
export default ClientView
