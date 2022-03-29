import React from 'react'
import './App.css'
import { SocketContext, socket } from './context/socket'
import ServerView from './views/ServerView'
import ClientView from './views/ClientView'

function App({ userRole }) {
  return (
    <SocketContext.Provider value={socket}>
      {
        userRole === 'server'
          ? <ServerView />
          : <ClientView />
      }
    </SocketContext.Provider>
  )
}
export default App
