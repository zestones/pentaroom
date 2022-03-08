/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import { makeStyles } from '@mui/styles'
import { genConfig } from 'react-nice-avatar'
import UserAvatar from '../avatar/userAvatar'

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
})

function Login({
  setUserRole, socket, isConnected, users, messages,
}) {
  const [config, setAvatarData] = useState({
    sex: 'woman',
    faceColor: 'white',
    earSize: 'small',
    eyeStyle: 'smile',
    noseStyle: 'short',
    mouthStyle: 'peace',
    shirtStyle: 'polo',
    glassesStyle: 'round',
    hairColor: '#000',
    hairStyle: 'womanShort',
    hatStyle: 'none',
    hatColor: '#000',
    eyeBrowStyle: 'up',
    shirtColor: '#F4D150',
    bgColor: 'linear-gradient(45deg, #176fff 0%, #68ffef 100%)',
  })

  const myAvatar = genConfig(config)

  const events = {
    connect: 'connect',
    disconnect: 'disconnect',
    updateUsers: 'update-users',
    newMessage: 'new-message',
    registration: 'registration',
  }

  const [registered, setIsRegistered] = useState(false)
  const classes = useStyles()
  const inputRef = useRef('')

  const handleValidation = () => {
    const { value } = inputRef.current
    if (!value || !socket) return
    socket.emit(events.registration, {
      id: socket.id,
      pseudo: value,
      avatar: '',
    })
    setIsRegistered(true)
  }

  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleValidation()
    }
  }

  return (
    <>
      {(registered)
      && (
        <UserAvatar
          setAvatarData={setAvatarData}
          myAvatar={myAvatar}
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
