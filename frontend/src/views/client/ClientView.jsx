import React, { useState, useRef, useContext } from 'react'
import '../../App.css'
import { makeStyles } from '@mui/styles'
import { genConfig } from 'react-nice-avatar'
import OutlinedInput from '@mui/material/OutlinedInput'
import Container from '@mui/material/Container'
import Header from './header/Header'
import TransparentContainer from './transparentContainer/TransparentContainer'
import AvatarPicker from './avatarPicker/AvatarPicker'
import PlayButton from './playButton/PlayButton'
import Icon from './animation/Icon'
import { SocketContext } from '../../context/socket'
import UserView from '../user/UserView'
import ChatDrawer from './ChatDrawer'

const useStyles = makeStyles({
  superContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    minHeight: '100%',
    padding: '30px 0',
  },
  mainContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
  },
  container: {
    margin: '20px auto',
  },
  Icon: {
    margin: '0 auto',
    display: 'block',
    padding: '20px 40px',
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
    borderRadius: '50px',
    backgroundColor: '#cce3f6',
    border: '1px solid black',
    padding: '0px 15px',
    fontSize: '20px',
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

function ClientView() {
  const classes = useStyles()

  const [avatar, setConfig] = useState(genConfig(
    {
      sex: 'woman',
      faceColor: '#f9c9b6',
      earSize: 'small',
      eyeStyle: 'smile',
      noseStyle: 'short',
      mouthStyle: 'peace',
      shirtStyle: 'polo',
      glassesStyle: 'round',
      hairColor: '#000',
      hairStyle: 'womanShort',
      hatStyle: 'none',
      hatColor: '#000',
      eyeBrowStyle: 'up',
      shirtColor: '#F4D150',
      bgColor: 'linear-gradient(45deg, #176fff 0%, #68ffef 100%)',
    },
  ))

  const socket = useContext(SocketContext)
  const [isRegister, setRegistered] = useState(false)

  const inputRef = useRef('')

  const handleValidation = () => {
    const { value } = inputRef.current
    if (!value || !socket || value.length < 5 || value.length > 10) return

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
    <Container maxWidth="xxl" className={classes.superContainer}>
      <Header />
      <ChatDrawer />
      { isRegister
        ? <UserView />
        : (
          <>
            <Container maxWidth="xxl" className={classes.mainContainer}>
              {' '}
              <TransparentContainer backgroundColor="#0000A5" className={classes.container}>
                <h2 className={classes.title}>1.Personnalise ton avatar :</h2>
                <AvatarPicker avatar={avatar} setConfig={setConfig} />
              </TransparentContainer>
              <TransparentContainer backgroundColor="#0000A5" className={classes.container}>
                <h2 className={classes.title}>2.Choisis un pseudo : </h2>
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
            <div className={classes.Icon}>
              <Icon />
            </div>
          </>
        )}

    </Container>
  )
}
export default ClientView
