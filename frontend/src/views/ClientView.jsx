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
  console.log('JE SUIS ICI')
  const socket = useContext(SocketContext)

  const [isLogged, setIsLogged] = useState(false)
  const [isChallenged, setIsChallenged] = useState(false)

  const [user, setUser] = useState({})
  const [words, setWords] = useState([])
  const [drawerId, setDrawerId] = useState()

  const handleUpdateDrawer = (data) => {
    console.log('------------CIICICICICICI')
    setWords(data.words)
    setDrawerId(data.id)
    if (drawerId === socket.id) setIsChallenged(true)
    else setIsChallenged(false)

    console.log(`${data.id}-->${isChallenged}`)
  }

  const handleRetrieveUser = (oldUser) => {
    const newUser = { ...user, pseudo: oldUser.pseudo, avatar: oldUser.avatar }
    setUser(newUser)
  }

  useEffect(() => {
    console.log('-------HERRREE')
    console.log(isLogged)
    if (isLogged) {
      socket.on('update-drawer', handleUpdateDrawer)
    }

    socket.on('retrieve-user', handleRetrieveUser)

    return () => {
      socket.off('update-drawer', handleUpdateDrawer)
    }
  }, [socket, isChallenged])

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
                ? <Drawer setIsChallenged={setIsChallenged} words={words} />
                : <UserInput />}
            </>
          )
          : <Login setIsLogged={setIsLogged} />
      }
    </>
  )
}
export default ClientView
