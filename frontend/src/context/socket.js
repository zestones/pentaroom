import { createContext } from 'react'

import io from 'socket.io-client'

const SERVER = process.env.REACT_APP_ENDPOINT || 'http://localhost:8080'

export const socket = io(SERVER, {
  pingInterval: 50000,
  pingTimeout: 60000,
  // upgradeTimeout: 20000,
  maxHttpBufferSize: 1e8,
})
export const SocketContext = createContext()
