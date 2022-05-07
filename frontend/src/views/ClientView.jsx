/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react'

import './ClientView.scss'

import clsx from 'clsx'
import Header from '../components/Header/Header'
import Login from '../components/Login/Login'
import UserInput from '../components/UserInput/UserInput'
// import ChatInput from '../components/ChatInput/ChatInput'
import Drawer from '../components/Drawer/Drawer'
import Timer from '../components/Timer/Timer'
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
  const [time, setTime] = useState(-1)

  const handleTimeLeft = (newTime) => setTime(newTime)

  const handleUpdateDrawer = (challenge) => {
    if (challenge.userId !== socket.id) {
      setIsChallenged(false)
    } else {
      setIsChallenged(true)
      setWords(challenge.words)
    }
  }

  const handleEndGame = () => {
    setIsChallenged(false)
  }

  const handleUpdateUser = (newUser) => setUser(newUser)

  useEffect(() => {
    socket.on('challenge', handleUpdateDrawer)
    socket.on('user-updated', handleUpdateUser)
    socket.on('time-left', handleTimeLeft)
    socket.on('end-game', handleEndGame)

    return () => {
      socket.off('challenge', handleUpdateDrawer)
      socket.off('user-updated', handleUpdateUser)
      socket.off('time-left', handleTimeLeft)
    }
  }, [socket])

  return (
    <>
      <div className={clsx('header-container', isChallenged ? 'active' : '')}>
        {isChallenged && <Timer time={time} />}
        <Header type={isChallenged ? 'in-line' : 'in-column'} />
      </div>
      {
        isLogged
          ? (
            isChallenged
              ? (
                <Drawer
                  setIsChallenged={setIsChallenged}
                  words={words}
                />
              )
              : (
                <>
                  {/* <ChatInput /> */}
                  <UserInput user={user} />
                </>
              )
          )
          : <Login setIsLogged={setIsLogged} />
      }
    </>
  )
}
export default ClientView
