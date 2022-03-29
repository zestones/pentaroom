import React, {
  useEffect, useState, useContext, useRef,
} from 'react'
import { makeStyles } from '@mui/styles'
import { SocketContext } from '../../context/socket'
import ServerViewMessage from './Message'

const useStyles = makeStyles({
  h1: {
    textAlign: 'center',
    '-webkit-text-stroke-width': '1px',
    '-webkit-text-stroke-color': 'black',

  },
  ol: {
    padding: '0',
  },
  messageContainer: {
    width: '25%',
    overflowY: 'auto',
    height: '100%%',
    border: 'solid',
  },
})

function ListMessages() {
  const socket = useContext(SocketContext)
  const classes = useStyles()
  const messageRef = useRef()

  const [messages, setMessages] = useState([])

  const handleUpdateMessages = (listMessages) => {
    setMessages(listMessages)
  }

  useEffect(() => {
    socket.on('updateMessages', handleUpdateMessages)

    return () => {
      socket.off('updateMessages', handleUpdateMessages)
    }
  }, [socket])

  return (
    <div className={classes.messageContainer}>
      <h1 className={classes.h1}>Chat</h1>
      <ol className={classes.ol}>
        {messages.map((message) => (
          <ServerViewMessage key={message.id} message={message} />
        ))}
      </ol>
      <div ref={messageRef} />
    </div>
  )
}
export default ListMessages
