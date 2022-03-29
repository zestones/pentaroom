import React, {
  useRef, useState, useEffect, useContext,
} from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Message from './Message'
import { SocketContext } from '../../context/socket'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#263238',
    flexGrow: '1',
  },
  paper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: 0,
  },
  messageContainer: {
    overflowY: 'auto',
    height: '85%',
  },
  ol: {
    paddingInlineEnd: '40px',
  },
})
function ListMessages() {
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState([])
  const classes = useStyles()
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
    <div className={classes.container}>
      <Paper elevation={5} className={classes.paper}>
        <div className={classes.messageContainer}>
          <ol className={classes.ol}>
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
