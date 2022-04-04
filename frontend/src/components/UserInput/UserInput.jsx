/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useRef, useState, useEffect, useContext,
} from 'react'

import './UserInput.scss'

import Avatar from 'react-nice-avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import OutlinedInput from '@mui/material/OutlinedInput'
import TransparentContainer from '../TransparentContainer/TransparentContainer'

import ChosenWord from '../temp/ChosenWord/ChosenWord'
import Alert from '../Alert/Alert'

import { SocketContext } from '../../context/socket'
import PlayButton from '../PlayButton/PlayButton'

function UserInput({ user }) {
  const socket = useContext(SocketContext)

  const inputRef = useRef('')

  const [alert, setAlert] = useState({
    open: false,
    title: '',
    text: '',
    type: 'danger',
  })

  const handleSuccess = () => {
    setAlert({
      open: true,
      title: 'Bravo !',
      text: 'Vous avez trouvé le bon mot',
      type: 'success',
    })
  }
  const handleFailure = () => {
    setAlert({
      open: true,
      title: 'Mauvais choix !',
      text: 'Ce n\'est pas le bon mot...',
      type: 'danger',
    })
  }

  const handleCloseAlert = () => { setAlert({ ...alert, open: false }) }

  const handleValidation = () => {
    const word = inputRef.current.value
    if (!word) return
    socket.emit('check-word', word)
    inputRef.current.value = ''
  }

  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleValidation()
    }
  }

  useEffect(() => {
    socket.on('success-word', handleSuccess)
    socket.on('failure-word', handleFailure)

    return () => {
      socket.off('success-word', handleSuccess)
      socket.off('failure-word', handleFailure)
    }
  }, [socket])

  return (
    <>
      <Container maxWidth="xxl" className="super-container">
        <Container className="subcontainer" maxWidth="lg">
          <Box className="user-infos">
            <div className="avatar-container">
              <Avatar fontSize="medium" className="avatar" {...user.avatar} />
              <h2 className="username">{user.pseudo}</h2>
            </div>
            <h2 className="score">
              SCORE :
              {' '}
              {user.score}
            </h2>
          </Box>
          <ChosenWord />
          <TransparentContainer backgroundColor="#0000A5" className="input-container">
            <h2 className="title">Entre un mot : </h2>
            <OutlinedInput
              inputRef={inputRef}
              fullWidth
              placeholder="Tape le mot ici ..."
              className="input-word"
              autoFocus={false}
              onKeyPress={handleKeyPressed}
            />
          </TransparentContainer>
          <PlayButton className="send-btn" onClick={handleValidation} />
        </Container>
      </Container>
      <Alert
        type={alert.type}
        open={alert.open}
        handleClose={handleCloseAlert}
        title={alert.title}
        text={alert.text}
      />
    </>
  )
}

export default UserInput
