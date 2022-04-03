import React, { useRef, useEffect, useContext } from 'react'
import './UserInput.scss'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import OutlinedInput from '@mui/material/OutlinedInput'
import TransparentContainer from '../TransparentContainer/TransparentContainer'

import ChosenWord from '../temp/ChosenWord/ChosenWord'

import { SocketContext } from '../../context/socket'

function UserInput() {
  const socket = useContext(SocketContext)
  const inputRef = useRef('')

  const handleSuccess = () => alert('trouvé !!!!')
  const handleFailure = () => alert('ce n\'est pas le bon mot')

  const handleValidation = () => {
    const word = inputRef.current.value
    if (!word) return
    alert(`Vous avez saisi ${word}`)
    socket.emit('check-word', word)
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
    <Container maxWidth="xxl" className="super-container">
      <Container className="subcontainer" maxWidth="lg">
        <ChosenWord />
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
  )
}

export default UserInput
