import React, { useRef } from 'react'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import { makeStyles } from '@mui/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import TransparentContainer from '../../pages/HomePage/transparentContainer/TransparentContainer'

const useStyles = makeStyles({
  superContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    padding: '30px 0',
  },
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
  },
  inputContainer: {
    margin: '20px auto',
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
  scores: {
    position: 'absolute',
    bottom: '50px',
    left: '300px',
  },
  inputWord: {
    borderRadius: '50px',
    backgroundColor: '#cce3f6',
    border: '1px solid black',
    padding: '0px 15px',
    fontSize: '20px',
  },
  title: {
    fontSize: '30px',
    margin: '0',
    marginBottom: '30px',
    '-webkit-text-stroke-width': '2px',
    '-webkit-text-stroke-color': 'black',
    letterSpacing: '1px',
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

  return (
    <Container maxWidth="xxl" className={classes.superContainer}>
      <Container className={classes.subcontainer} maxWidth="lg">
        <div className={classes.hiddenWord} />
        <TransparentContainer backgroundColor="#0000A5" className={classes.inputContainer}>
          <h2 className={classes.title}>Entre un mot : </h2>
          <OutlinedInput
            inputRef={inputRef}
            fullWidth
            placeholder="Tape le mot ici ..."
            className={classes.inputWord}
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
