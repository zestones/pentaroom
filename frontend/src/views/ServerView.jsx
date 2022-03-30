import React from 'react'

import './ServerView.scss'

import Box from '@mui/material/Box'
import Canvas from '../components/Canvas/Canvas'
import ListUsers from '../components/ListUsers/ListUsers'
import ListMessages from '../components/ListMessages/ListMessages'

function ServerView() {
  return (
    <Box className="server-container">

      <div className="column">
        <h1>Joueurs</h1>
        <ListUsers />
      </div>

      <Canvas userRole="server" />

      <div className="message-container">
        <h1>Chat</h1>
        <ListMessages />
      </div>

    </Box>
  )
}
export default ServerView
