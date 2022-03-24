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
  },
  subcontainer: {
    textAlign: 'center',
  },
  sendButton: {
    marginTop: '30px',
  },
  scores: {
    position: 'absolute',
    bottom: '50px',
    left: '300px',
  },
})

function UserInput() {
  const classes = useStyles()

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

  const [displayScore, setDisplayScore] = useState(false)

  const handleClick = () => {
    setDisplayScore(true)
  }

  return (
    <>
      {
        (displayScore) && (
          <ScoreBoard />
        )
      }

      <Container className={classes.container} maxWidth="xxl">
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
        <Button
          className={classes.scores}
          variant="contained"
          name="click"
          onClick={handleClick}

        >
          resultat

        </Button>
      </Container>
    </>
  )
}

export default UserInput
