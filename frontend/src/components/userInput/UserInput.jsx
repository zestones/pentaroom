import React, { useRef, useState } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import { makeStyles } from '@mui/styles'
import ScoreBoard from '../resultat/ScoreBoard'

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

  const [displayScore, setDisplayScore] = useState(false)

  const handleClick = () => {
    setDisplayScore(true)
  }

  return (
    <Container className={classes.container} maxWidth="xxl">
      <div className={classes.hiddenWord}>
        <h1>
          {hiddenWord}
        </h1>
      </div>
      <Container className={classes.subcontainer} maxWidth="lg">
        <TextField
          inputRef={inputRef}
          fullWidth
          label="Saisissez votre mot"
          variant="outlined"
          onKeyPress={handleKeyPressed}
        />
        <Button className={classes.sendButton} variant="contained" endIcon={<SendIcon />} onClick={handleValidation}>
          Envoyer
        </Button>
      </Container>
    </>
  )
}

export default UserInput
