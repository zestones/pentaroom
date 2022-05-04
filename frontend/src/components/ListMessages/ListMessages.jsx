import React, {
  useRef, useState, useEffect, useContext,
} from 'react'
import Message from './Message'
import { SocketContext } from '../../context/socket'
import styles from './ListMessages.module.scss'

function ListMessages({ title }) {
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState([])
  const messageRef = useRef()

  // handle new messages
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
    <div className={styles.chatContainer}>
      {title && <h2 className={styles.chatTitle}>{title}</h2> }
      <div className={styles.overflowContainer}>
        <ul className={styles.messageContainer} ref={messageRef}>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ListMessages
