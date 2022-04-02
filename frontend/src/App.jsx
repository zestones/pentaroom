import React from 'react'
import './App.scss'
import Box from '@mui/material/Box'
import { SocketContext, socket } from './context/socket'
import ServerView from './views/ServerView'
import ClientView from './views/ClientView'

function App({ userRole }) {
  return (
    <SocketContext.Provider value={socket}>
      <Box className="app-container">
        {
          userRole === 'server'
            ? <ServerView />
            : <ClientView />
        }
      </Box>
    </SocketContext.Provider>
  )
}
export default App
