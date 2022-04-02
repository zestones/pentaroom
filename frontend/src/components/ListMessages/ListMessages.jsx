import React, {
  useRef, useState, useEffect, useContext,
} from 'react'
import Message from './Message'
import { SocketContext } from '../../context/socket'
import styles from './ListMessages.module.scss'

function ListMessages() {
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState([])
  const messageRef = useRef()

  const handleNewMessages = (newReceivedMessage) => {
    setMessages([...messages, newReceivedMessage])
  }

  useEffect(() => {
    socket.on('message', handleNewMessages)

    return () => {
      socket.off('message', handleNewMessages)
    }
  }, [socket, messages])

  return (
    <div className={styles.overflowContainer}>
      <ul className={styles.messageContainer} ref={messageRef}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </ul>
    </div>
  )
}

export default ListMessages
