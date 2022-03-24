import React, { useRef } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import { makeStyles } from '@mui/styles'
import TransparentContainer from '../../pages/HomePage/transparentContainer/TransparentContainer'
import Header from '../../pages/HomePage/header/Header'

const useStyles = makeStyles({
  container: {
    height: '100%',
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

function UserInput({ hiddenWord }) {
  const classes = useStyles()

  const inputRef = useRef('')

  const handleValidation = () => {
    const { value } = inputRef.current
    if (!value) return
    alert(`Vous avez saisi : ${value} , mot à trouver : ${hiddenWord}`)
  }
  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleValidation()
    }
  }

  return (
    <Container className={classes.container} maxWidth="xxl">
      <Header />
      <div className={classes.hiddenWord}>
        <h1>
          {hiddenWord}
        </h1>
      </div>
      <Container className={classes.subcontainer} maxWidth="lg">
        <TransparentContainer backgroundColor="#0000A5">
          <TextField
            inputRef={inputRef}
            fullWidth
            label="Saisissez votre mot"
            variant="outlined"
            onKeyPress={handleKeyPressed}
          />
        </TransparentContainer>
        <Button className={classes.sendButton} variant="contained" endIcon={<SendIcon />} onClick={handleValidation}>
          Envoyer
        </Button>
      </Container>
    </Container>
  )
}

export default UserInput
