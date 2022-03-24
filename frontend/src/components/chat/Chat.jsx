import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Message from './Message'

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
function Chat({
  messages, sendMessage, setUserRole,
}) {
  const [newMessage, setNewMessage] = useState('')
  const classes = useStyles()
  const messageRef = useRef()

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleSendMessage = () => {
    if (newMessage !== '') {
      sendMessage(newMessage)
      setNewMessage('')
    }
  }

  // extra code to send the message as you press the enter key.
  const handleKeyUp = (event) => {
    if (event.key !== 'Enter') return
    if (newMessage === '') return

    if (newMessage === '/server') {
      setUserRole('server')
    } else {
      sendMessage(newMessage)
      setNewMessage('')
    }
  }

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
            onKeyUp={handleKeyUp}
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
