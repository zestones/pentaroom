import React, { useState, useRef } from 'react'
import '../../App.css'
import { makeStyles } from '@mui/styles'
import { genConfig } from 'react-nice-avatar'
import OutlinedInput from '@mui/material/OutlinedInput'
import Container from '@mui/material/Container'
import Header from './header/Header'
import TransparentContainer from './transparentContainer/TransparentContainer'
import AvatarPicker from './avatarPicker/AvatarPicker'
import PlayButton from './playButton/PlayButton'

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
  },
  container: {
    margin: '50px auto',
  },
  title: {
    fontSize: '30px',
    margin: '0',
    marginBottom: '30px',
    '-webkit-text-stroke-width': '2px',
    '-webkit-text-stroke-color': 'black',
    letterSpacing: '1px',
  },
  inputName: {
    height: '75px',
    borderRadius: '50px',
    backgroundColor: '#cce3f6',
    border: '1px solid black',
    padding: '5px 30px',
    fontSize: '30px',
  },
})

const events = {
  connect: 'connect',
  disconnect: 'disconnect',
  updateUsers: 'update-users',
  newMessage: 'new-message',
  findWord: 'find-word',
  drawerUsers: 'drawer-users',
  registration: 'registration',
}

function HomePage({ socket, setRegistered }) {
  const classes = useStyles()

  const [avatar, setConfig] = useState(genConfig())
  const inputRef = useRef('')

  const handleValidation = () => {
    if (!socket) return

    const { value } = inputRef.current
    socket.emit(events.registration, {
      id: socket.id,
      pseudo: value,
      avatar,
    })
    setRegistered(true)
  }

  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleValidation()
    }
  }

  return (
    <>
      <Header />
      <Container maxWidth="xxl" className={classes.mainContainer}>
        <TransparentContainer backgroundColor="#0000A5" className={classes.container}>
          <h2 className={classes.title}>1.Personnalise ton avatar :</h2>
          <AvatarPicker avatar={avatar} setConfig={setConfig} />
        </TransparentContainer>
        <TransparentContainer backgroundColor="#0000A5" className={classes.container}>
          <h2 className={classes.title}>2.Choisis un pseudo :</h2>

          <OutlinedInput
            inputRef={inputRef}
            fullWidth
            placeholder="Tape ton pseudo ici ..."
            className={classes.inputName}
            onKeyPress={handleKeyPressed}
          />
        </TransparentContainer>
      </Container>
      <PlayButton onClick={handleValidation} />
    </>
  )
}
export default HomePage
