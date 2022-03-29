/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react'
import '../App.css'
import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import Header from '../components/Header/Header'
import Login from '../components/Login/Login'
import UserInput from '../components/UserInput/UserInput'
import Chat from '../components/Chat/Chat'
import Drawer from '../components/Drawer/Drawer'
import SwitchRoleButton from '../components/temp/SwitchRoleButton/SwitchRoleButton'
import { SocketContext } from '../context/socket'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    minHeight: '100%',
    padding: '30px 0',
  },

})

function ClientView() {
  const socket = useContext(SocketContext)
  const classes = useStyles()
  const [isLogged, setIsLogged] = useState(false)
  const [isChallenged, setIsChallenged] = useState(false)

  const [words, setWords] = useState([])

  const handleUpdateDrawer = (data) => {
    setWords(data)
    setIsChallenged(true)
  }
  useEffect(() => {
    socket.on('update-drawer', handleUpdateDrawer)

    return () => {
      socket.off('update-drawer', handleUpdateDrawer)
    }
  }, [socket])

  return (
    <Container maxWidth="xxl" className={classes.container}>
      <Header />
      {
        isLogged
          ? (
            <>
              <Chat />
              <SwitchRoleButton
                isChallenged={isChallenged}
                setIsChallenged={setIsChallenged}
                setWords={setWords}
              />
              {' '}
              {isChallenged
                ? <Drawer setIsChallenged={setIsChallenged} words={words} />
                : <UserInput />}
            </>
          )
          : <Login setIsLogged={setIsLogged} />
      }
    </Container>
  )
}
export default ClientView
