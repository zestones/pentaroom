import React, {
  useRef, useState, useEffect, useContext,
} from 'react'
import Paper from '@mui/material/Paper'
import Message from './Message'
import { SocketContext } from '../../context/socket'
import './ListMessages.scss'

function ListMessages() {
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState([])
  const messageRef = useRef()

  const handleNewMessages = (newReceivedMessage) => {
    setMessages([...messages, newReceivedMessage])
  }

  useEffect(() => {
    socket.on('new-message', handleNewMessages)

    return () => {
      socket.off('message', handleNewMessages)
    }
  }, [socket, messages])

  return (
    <div className="container">
      <Paper elevation={5} className="paper">
        <div className="messageContainer">
          <ol className="ol">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </ol>
          <div ref={messageRef} />
        </div>
      </Paper>
    </div>
  )
}

export default ListMessages
