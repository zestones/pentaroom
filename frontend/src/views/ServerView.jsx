import React, { useContext, useState, useEffect } from 'react'

import './ServerView.scss'

import Box from '@mui/material/Box'
import Canvas from '../components/Canvas/Canvas'
import ListUsers from '../components/ListUsers/ListUsers'
import ListMessages from '../components/ListMessages/ListMessages'
import PlayButton from '../components/PlayButton/PlayButton'
import Alert from '../components/Alert/Alert'

import { SocketContext } from '../context/socket'

function ServerView() {
  const NB_MIN_USERS = 1

  const socket = useContext(SocketContext)

  const [users, setUsers] = useState([])

  const [isInGame, setIsInGame] = useState(false)

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

  useEffect(() => {
    socket.on('update-users', handleUpdateUsers)
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
    </>
  )
}
export default ServerView
