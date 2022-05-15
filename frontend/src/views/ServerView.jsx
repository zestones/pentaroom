import React, { useContext, useState, useEffect } from 'react'

import './ServerView.scss'
import Box from '@mui/material/Box'
import Canvas from '../components/Canvas/Canvas'
import ListUsers from '../components/ListUsers/ListUsers'
// import ListMessages from '../components/ListMessages/ListMessages'
import PlayButton from '../components/PlayButton/PlayButton'
import Alert from '../components/Alert/Alert'
import ListScores from '../components/ListScores/ListScores'

import { SocketContext } from '../context/socket'
import Audio from '../components/Audio/Audio'

function ServerView() {
  const NB_MIN_USERS = 2

  const socket = useContext(SocketContext)
  const [users, setUsers] = useState([])
  const [isInGame, setIsInGame] = useState(false)

  const [isEndGame, setIsEndGame] = useState(false)

  const [music, setMusic] = useState({
    home: {
      src: '/BGM/penta-home.mp3',
      volume: 1,
      playing: true,
      loop: true,
    },
    // challenge: {
    //   src: '/BGM/penta-challenge.mp3',
    //   volume: 0.8,
    //   playing: false,
    //   loop: false,
    // },
  })

  const [alert, setAlert] = useState({
    open: false,
    title: 'Lancement impossible',
    text: '',
    type: 'danger',
  })

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

  const handleLaunchGame = () => {
    const availableUsers = users.filter((user) => user.pseudo !== '' && user.avatar !== undefined)
    if (availableUsers.length < NB_MIN_USERS) {
      setAlert({ ...alert, open: true, text: `Il est nécessaire d'avoir au moins ${NB_MIN_USERS} joueurs pour lancer la partie.` })
    } else {
      const nbGames = prompt('Nombre de run ?')
      socket.emit('run-left', nbGames)
      setIsInGame(true)
      socket.emit('update-drawer')
    }
  }

  const handleUpdateUsers = (newUsers) => {
    setUsers(newUsers)
  }

  // const handleMusic = (active) => {
  //   if (active) {
  //     setMusic({
  //       ...music,
  //       home: {
  //         ...music.home,
  //         playing: false,
  //       },
  //       challenge: {
  //         ...music.challenge,
  //         playing: true,
  //       },
  //     })
  //   }
  // }

  const handleInitServer = (infos) => {
    setIsInGame(isInGame)
    setMusic({
      ...music,
      home: {
        ...music.home,
        playing: !isInGame,
      },
      challenge: {
        ...music.challenge,
        playing: isInGame,
      },
    })

    if (infos.users.length) {
      setUsers(infos.users)
    }
  }

  const handleEndGame = () => {
    setIsInGame(false)
    setIsEndGame(true)
  }

  const handleChallenge = (challenge) => {
    if (!isInGame && challenge.userId) {
      setIsInGame(true)
    }
  }

  useEffect(() => {
    socket.on('update-users', handleUpdateUsers)
    // socket.on('music-challenge', handleMusic)
    socket.on('init-server', handleInitServer)
    socket.on('end-game', handleEndGame)
    socket.on('challenge', handleChallenge)
    socket.emit('is-server')
    return () => {
      socket.off('update-users', handleUpdateUsers)
      // socket.off('music-challenge', handleMusic)
      socket.off('end-game', handleEndGame)
      socket.off('challenge', handleChallenge)
    }
  }, [socket])

  const handleReload = () => {
    const nbGames = prompt('Nombre de run ?')
    socket.emit('reload', nbGames)
  }

  const handleClose = () => {
    setIsEndGame(false)
  }

  return (
    <>
      <Box className="server-container">
        <div className="left-part">
          <div className="list-users-container">
            <ListUsers title="Joueurs" order />
          </div>
          <PlayButton onClick={handleLaunchGame} active={!isInGame} />
          <button onClick={handleReload} className="reload-button" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M496 48V192c0 17.69-14.31 32-32 32H320c-17.69 0-32-14.31-32-32s14.31-32 32-32h63.39c-29.97-39.7-77.25-63.78-127.6-63.78C167.7 96.22 96 167.9 96 256s71.69 159.8 159.8 159.8c34.88 0 68.03-11.03 95.88-31.94c14.22-10.53 34.22-7.75 44.81 6.375c10.59 14.16 7.75 34.22-6.375 44.81c-39.03 29.28-85.36 44.86-134.2 44.86C132.5 479.9 32 379.4 32 256s100.5-223.9 223.9-223.9c69.15 0 134 32.47 176.1 86.12V48c0-17.69 14.31-32 32-32S496 30.31 496 48z" />
            </svg>
          </button>
        </div>

        <Canvas userRole="server" />

        {/* <div className="chat-container">
          <ListMessages title="Chat" />
        </div> */}

      </Box>
      <Alert
        type={alert.type}
        open={alert.open}
        handleClose={handleCloseAlert}
        title={alert.title}
        text={alert.text}
        time={alert.time}
      />

      {isEndGame && <ListScores handleClose={handleClose} />}

      <Audio
        url={music.home.src}
        vol={music.home.volume}
        play={music.home.playing}
        looping={music.home.loop}
      />
      {/* <Audio
        url={music.challenge.src}
        vol={music.challenge.volume}
        play={music.challenge.playing}
        looping={music.challenge.loop}
      /> */}
    </>
  )
}
export default ServerView
