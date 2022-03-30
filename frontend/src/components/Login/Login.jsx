import React, { useState, useRef, useContext } from 'react'
import '../../App.css'
import './Login.scss'
import { genConfig } from 'react-nice-avatar'
import OutlinedInput from '@mui/material/OutlinedInput'
import Container from '@mui/material/Container'
import TransparentContainer from '../TransparentContainer/TransparentContainer'
import AvatarPicker from '../AvatarPicker/AvatarPicker'
import PlayButton from '../PlayButton/PlayButton'
import { SocketContext } from '../../context/socket'

function Login({ setIsLogged }) {
  const socket = useContext(SocketContext)

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
  const inputRef = useRef('')

  const handleValidation = () => {
    const { value } = inputRef.current
    if (!value || !socket || value.length < 5 || value.length > 10) return

    socket.emit('registration', {
      id: socket.id,
      pseudo: value,
      avatar,
    })
    setIsLogged(true)
  }

  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleValidation()
    }
  }

  return (
    <>
      <Container maxWidth="xxl" className="mainContainer">
        <TransparentContainer backgroundColor="#0000A5" className="container">
          <h2 className="title">1.Personnalise ton avatar :</h2>
          <AvatarPicker avatar={avatar} setConfig={setConfig} />
        </TransparentContainer>
        <TransparentContainer backgroundColor="#0000A5" className="container">
          <h2 className="title">2.Choisis un pseudo : </h2>
          <OutlinedInput
            inputRef={inputRef}
            fullWidth
            placeholder="Tape ton pseudo ici ..."
            className="inputName"
            onKeyPress={handleKeyPressed}
          />
        </TransparentContainer>
      </Container>
      <PlayButton onClick={handleValidation} />
    </>
  )
}
export default Login
