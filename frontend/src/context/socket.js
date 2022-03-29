import { createContext } from 'react'

import io from 'socket.io-client'

const SERVER = process.env.REACT_APP_ENDPOINT || 'http://localhost:8080'

export const socket = io(SERVER)
export const SocketContext = createContext()
