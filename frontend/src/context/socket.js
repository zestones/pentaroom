import { createContext } from 'react'

import io from 'socket.io-client'

const SERVER = process.env.REACT_APP_ENDPOINT || 'http://192.168.1.139:8080'

export const socket = io(SERVER)
export const SocketContext = createContext()
