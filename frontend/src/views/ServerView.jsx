import React from 'react'

import './ServerView.scss'

import Box from '@mui/material/Box'
import Canvas from '../components/Canvas/Canvas'
import ListUsers from '../components/ListUsers/ListUsers'
import ListMessages from '../components/ListMessages/ListMessages'

function ServerView() {
  return (
    <Box className="server-container">

      <div className="list-users-container">
        <ListUsers title="Joueurs" />
      </div>

      <Canvas userRole="server" />

      <div className="chat-container">
        <ListMessages title="Chat" />
      </div>

    </Box>
  )
}
export default ServerView
