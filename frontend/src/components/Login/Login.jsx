import React, {
  useState, useRef, useContext, useEffect,
} from 'react'

import { genConfig } from 'react-nice-avatar'
import OutlinedInput from '@mui/material/OutlinedInput'
import Container from '@mui/material/Container'
import styles from './Login.module.scss'
import TransparentContainer from '../TransparentContainer/TransparentContainer'
import AvatarPicker from '../AvatarPicker/AvatarPicker'
import PlayButton from '../PlayButton/PlayButton'
import Alert from '../Alert/Alert'

import { SocketContext } from '../../context/socket'
import Tagline from '../Animation/Tagline'

function Login({ setIsLogged }) {
  const socket = useContext(SocketContext)

  const [alert, setAlert] = useState({
    open: false,
    title: 'Login Impossible',
    text: '',
    type: 'danger',
  })

  // handle event when the alert is close
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

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
      bgColor: '#ffcc00',
    },
  ))
  const inputRef = useRef('')

  // handle the validation of the user
  const handleValidation = () => {
    const { value } = inputRef.current

    if (!value || !socket || value.length < 5 || value.length > 10) {
      const newAlert = { ...alert }
      if (!socket) {
        newAlert.text = 'Connexion impossible'
      } else if (!value) {
        newAlert.text = 'Vous devez rentrer un nom d\'utilisateur'
      } else if (value.length < 5) {
        newAlert.text = 'Votre pseudo doit contenir au moins 5 lettres'
      } else if (value.length > 10) {
        newAlert.text = 'Votre pseudo doit contenir moins de 10 lettres'
      }
      newAlert.open = true
      setAlert(newAlert)
      return
    }

    socket.emit('new-user', {
      id: socket.id,
      pseudo: value,
      avatar,
    })
  }

  // handle enter key click
  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleValidation()
    }
  }

  // display alert if the pseudo is already used
  const handlePseudoTaken = (isTaken) => {
    if (isTaken) {
      setAlert({
        ...alert,
        open: true,
        text: 'Ce pseudo est déjà utilisé.',
        type: 'danger',
      })
    }
    setIsLogged(!isTaken)
  }

  useEffect(() => {
    socket.on('pseudo-taken', handlePseudoTaken)

    return () => {
      socket.off('pseudo-taken', handlePseudoTaken)
    }
  }, [socket])

  return (
    <>
      <Container maxWidth="xxl" className={styles.mainContainer}>
        <TransparentContainer backgroundColor="#0000A5" className={styles.container}>
          <h2 className={styles.title}>1.Personnalise ton avatar :</h2>
          <AvatarPicker avatar={avatar} setConfig={setConfig} />
        </TransparentContainer>
        <TransparentContainer backgroundColor="#0000A5" className={styles.container}>
          <h2 className={styles.title}>2.Choisis un pseudo : </h2>
          <OutlinedInput
            inputRef={inputRef}
            fullWidth
            placeholder="Tape ton pseudo ici ..."
            className={styles.inputName}
            onKeyPress={handleKeyPressed}
            autoFocus={false}
          />
        </TransparentContainer>
      </Container>
      <PlayButton onClick={handleValidation} />
      <div className={styles.tagline}>
        <Tagline />
      </div>
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
export default Login
