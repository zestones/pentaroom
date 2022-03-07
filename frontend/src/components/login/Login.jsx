/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import { makeStyles } from '@mui/styles'
import UserAvatar from './userAvatar'
import UserView from '../UserView/UserView'

const useStyles = makeStyles({
  container: {
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
    flexDirection: 'column',

  },
  subcontainer: {
    textAlign: 'center',
  },
  sendButton: {
    marginTop: '30px',
  },
  hiddenWord: {
    color: 'black',
    textAlign: 'center',
  },
})

function Login({
  setUserRole, socket, isConnected, users, messages,
}) {
  const events = {
    connect: 'connect',
    disconnect: 'disconnect',
    updateUsers: 'update-users',
    newMessage: 'new-message',
    registration: 'registration',
  }

  const [connected, setIsConnected] = useState(false)
  const classes = useStyles()
  const inputRef = useRef('')

  const handleValidation = () => {
    const { value } = inputRef.current
    if (!value || !socket) return
    socket.emit(events.registration, {
      id: socket.id,
      pseudo: value,
    })
    setIsConnected(true)
  }

  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleValidation()
    }
  }

  return (
    <>
      {(connected)
      && (
        <UserView
          setUserRole={setUserRole}
          socket={socket}
          isConnected={isConnected}
          users={users}
          messages={messages}
        />
      )}
      <Container className={classes.container} maxWidth="xxl">
        <div className={classes.hiddenWord}>
          <h1> Pentaroom </h1>
          <p> Réveille le picasso en toi </p>
        </div>
        <UserAvatar />
        <Container className={classes.subcontainer} maxWidth="lg">

          <TextField
            inputRef={inputRef}
            fullWidth
            label="Saisissez votre pseudo"
            variant="outlined"
            onKeyPress={handleKeyPressed}
          />
          <Button className={classes.sendButton} variant="contained" endIcon={<SendIcon />} onClick={handleValidation}>
            Envoyer
          </Button>
        </Container>
      </Container>
    </>
  )
}

export default Login
