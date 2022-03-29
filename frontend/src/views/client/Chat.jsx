import React, {
  useRef, useState, useEffect, useContext,
} from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { v4 as uuid } from 'uuid'
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
  action: {
    display: 'flex',
    width: '96%',
    alignItems: 'center',
    margin: '1em',
    position: 'absolute',
    bottom: 0,
  },
  sendButton: {
    width: '10em',
    height: '50%',
    margin: '0 2em',
  },
  messageInput: {
    width: '100%',
  },
  messageContainer: {
    overflowY: 'auto',
    height: '85%',
  },
  divider: {
    margin: '0.1em',
  },
  ol: {
    paddingInlineEnd: '40px',
  },
})
function Chat() {
  const socket = useContext(SocketContext)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const classes = useStyles()
  const messageRef = useRef()

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const getUsername = () => {
    const index = users.map((x) => x.id).indexOf(socket.id)
    return users[index]?.pseudo
  }

  const getUserAvatar = () => {
    const index = users.map((x) => x.id).indexOf(socket.id)
    return users[index]?.avatar
  }

  const handleUpdateUsers = (listUsers) => {
    setUsers(listUsers)
  }

  const sendMessage = (messageBody) => {
    socket.emit('new-message', {
      id: uuid(),
      body: messageBody,
      senderId: socket.id,
      pseudo: getUsername(),
      avatar: getUserAvatar(),
      time: new Date(),
    })
  }
  const handleSendMessage = () => {
    if (newMessage !== '') {
      sendMessage(newMessage)
      setNewMessage('')
    }
  }

  const handleNewMessages = (newReceivedMessage) => {
    setMessages([...messages, newReceivedMessage])
  }

  useEffect(() => {
    socket.on('new-message', handleNewMessages)
    socket.on('update-users', handleUpdateUsers)

    return () => {
      socket.off('message', handleNewMessages)
      socket.off('update-users', handleUpdateUsers)
    }
  }, [socket, messages])

  // allow scrolling to the bottom of the container when a new message arrived.
  useEffect(() => messageRef.current.scrollIntoView({ behavior: 'smooth' }))

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
        <div className={classes.action}>
          <TextField
            className={classes.messageInput}
            id="message"
            label="Message"
            variant="outlined"
            value={newMessage}
            onChange={handleNewMessageChange}
          />
          <Button
            disabled={!newMessage}
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            className={classes.sendButton}
          >
            Envoyer
          </Button>
        </div>
      </Paper>
    </div>
  )
}

export default Chat
