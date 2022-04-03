/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useRef, useState, useEffect, useContext,
} from 'react'

import './UserInput.scss'

import Avatar from 'react-nice-avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import OutlinedInput from '@mui/material/OutlinedInput'
import TransparentContainer from '../TransparentContainer/TransparentContainer'

// import ChosenWord from '../temp/ChosenWord/ChosenWord'
import Alert from '../Alert/Alert'

import { SocketContext } from '../../context/socket'

function UserInput() {
  const socket = useContext(SocketContext)
  const [users, setUsers] = useState([])

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

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

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

  const getUserIndex = () => users.map((x) => x.id).indexOf(socket.id)

  const getUsername = () => {
    const index = getUserIndex()
    if (index !== -1) return users[index].pseudo
    return 'none'
  }

  const getUserAvatar = () => {
    const index = getUserIndex()
    if (index !== -1) return users[index].avatar
    return 'none'
  }

  const getUserScore = () => {
    const index = getUserIndex()
    if (index !== -1) return users[index].score
    return 'none'
  }

  const handleUpdateUsers = (listUsers) => { setUsers(listUsers) }

  useEffect(() => {
    socket.on('success-word', handleSuccess)
    socket.on('failure-word', handleFailure)
    socket.on('update-users', handleUpdateUsers)

    return () => {
      socket.off('success-word', handleSuccess)
      socket.off('failure-word', handleFailure)
      socket.off('update-users', handleUpdateUsers)
    }
  }, [socket])

  return (
    <>
      <Container maxWidth="xxl" className="super-container">
        <Container className="subcontainer" maxWidth="lg">

          <Box className="user-infos">
            <div className="avatar-container">
              <Avatar fontSize="medium" className="avatar" {...getUserAvatar()} />
              <h2 className="score">
                SCORE :
                {' '}
                {getUserScore()}
              </h2>
            </div>
            <h2 className="username">{getUsername()}</h2>
            {/* <ChosenWord /> */}
          </Box>
          <TransparentContainer backgroundColor="#0000A5" className="input-container">
            <h2 className="title">Entre un mot : </h2>
            <OutlinedInput
              inputRef={inputRef}
              fullWidth
              placeholder="Tape le mot ici ..."
              className="input-word"
              onKeyPress={handleKeyPressed}
            />
          </TransparentContainer>
          <Button className="send-btn" variant="contained" endIcon={<SendIcon />} onClick={handleValidation}>
            Envoyer
          </Button>
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
