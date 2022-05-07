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
import Animation from '../Animation/Animation'

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

  const [animationPath, setAnimationPath] = useState({
    path: '/SuccessAlert.svg',
    type: 'danger',
    open: false,
  })

  const handleSuccess = () => {
    setAnimationPath({
      ...animationPath,
      open: true,
    })
  }
  const handleFailure = () => {
    setAlert({
      open: true,
      title: 'Mauvais choix !',
      text: 'Ce n\'est pas le bon mot... Réessayez !',
      type: 'danger',
    })
  }
  const handleCloseAnimation = () => { setAnimationPath({ ...animationPath, open: false }) }
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

  const handleUndefined = () => {
    setAlert({
      open: true,
      title: 'Patience !',
      text: 'Le PenTeur choisit un mot.',
      type: 'danger',
    })
  }

  const handleAlreadyFinded = () => {
    setAlert({
      open: true,
      title: 'Désolé !',
      text: 'Vous avez déjà trouvé le mot.',
      type: 'danger',
    })
  }

  useEffect(() => {
    socket.on('undefined-word', handleUndefined)
    socket.on('word-already-found', handleAlreadyFinded)
    socket.on('success-word', handleSuccess)
    socket.on('failure-word', handleFailure)

    return () => {
      socket.off('word-already-found', handleAlreadyFinded)
      socket.off('undefined-word', handleUndefined)
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
      <Animation
        path={animationPath.path}
        type={animationPath.type}
        open={animationPath.open}
        handleClose={handleCloseAnimation}
      />
    </>
  )
}

export default UserInput
