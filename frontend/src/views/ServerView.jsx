import React, { useContext, useState, useEffect } from 'react'

import './ServerView.scss'
import Box from '@mui/material/Box'
import Canvas from '../components/Canvas/Canvas'
import ListUsers from '../components/ListUsers/ListUsers'
import ListMessages from '../components/ListMessages/ListMessages'
import PlayButton from '../components/PlayButton/PlayButton'
import Alert from '../components/Alert/Alert'

import { SocketContext } from '../context/socket'
import SoundManager from './SoundManager'

function ServerView() {
  const NB_MIN_USERS = 1

  const socket = useContext(SocketContext)
  const [users, setUsers] = useState([])
  const [isInGame, setIsInGame] = useState(false)

  const [music, setMusic] = useState(
    {
      home: {
        src: '/home.mp3',
        volume: 1,
        playing: true,
        loop: true,
      },
      challenge: {
        src: '/penta-challenge.mp3',
        volume: 0.8,
        playing: false,
        loop: false,
      },
    },
  )

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
      setIsInGame(true)
      socket.emit('update-drawer')
    }
  }

  const handleUpdateUsers = (newUsers) => {
    setUsers(newUsers)
  }

  const handleMusic = (word) => {
    // !! New events needed
    if (word !== 'aucun mot') {
      setMusic({
        ...music,
        home: {
          ...music.home,
          volume: 0.25,
        },
        challenge: {
          ...music.challenge,
          playing: true,
        },
      })
    } else {
      setMusic({ ...music, home: { ...music.home, volume: 0.6 } })
    }
  }
  // ! Create a new events
  useEffect(() => {
    socket.on('update-users', handleUpdateUsers)
    socket.on('temp-chosen-word', handleMusic)
    return () => {
      socket.off('update-users', handleUpdateUsers)
      socket.off('temp-chosen-word', handleMusic)
    }
  }, [socket])

  return (
    <>
      <Box className="server-container">
        <div className="left-part">
          <div className="list-users-container">
            <ListUsers title="Joueurs" order />
          </div>
          <PlayButton onClick={handleLaunchGame} active={!isInGame} />
        </div>

        <Canvas userRole="server" />

        <div className="chat-container">
          <ListMessages title="Chat" />
        </div>

      </Box>
      <Alert
        type={alert.type}
        open={alert.open}
        handleClose={handleCloseAlert}
        title={alert.title}
        text={alert.text}
        time={alert.time}
      />
      <SoundManager
        url={music.home.src}
        vol={music.home.volume}
        play={music.home.playing}
        looping={music.home.loop}
      />
      <SoundManager
        url={music.challenge.src}
        vol={music.challenge.volume}
        play={music.challenge.playing}
        looping={music.challenge.loop}
      />
    </>
  )
}
export default ServerView
