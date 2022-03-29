import React, { useRef } from 'react'
import './UserInput.scss'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import OutlinedInput from '@mui/material/OutlinedInput'
import TransparentContainer from '../TransparentContainer/TransparentContainer'

function UserInput() {
  const inputRef = useRef('')

  const handleValidation = () => {
    const { value } = inputRef.current
    if (!value) return
    alert(`Vous avez saisi ${value}`)
  }
  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleValidation()
    }
  }

  return (
    <Container maxWidth="xxl" className="super-container">
      <Container className="subcontainer" maxWidth="lg">
        <div className="hidden-word" />
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
