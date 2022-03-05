import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import clsx from 'clsx'

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
  message: {
    listStyle: 'none',
  },
  owner: {
    margin: '1em',
    backgroundColor: '#0091EA',
    padding: '0.5em 1.5em',
    borderRadius: '20px',
    color: '#FFF',
    wordBreak: 'break-word',
    maxWidth: '65%',
    width: 'fit-content',
    marginRight: 'auto',
  },
  guest: {
    margin: '1em',
    backgroundColor: '#8BC34A',
    padding: '0.5em 1.5em',
    borderRadius: '20px',
    color: '#FFF',
    wordBreak: 'break-word',
    maxWidth: '65%',
    width: 'fit-content',
    marginLeft: 'auto',
  },
  ol: {
    paddingInlineEnd: '40px',
  },
})
function Chat({ messages, sendMessage }) {
  const [newMessage, setNewMessage] = useState('')
  const classes = useStyles()
  const messageRef = useRef()

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value)
    console.log(newMessage)
  }

  const handleSendMessage = () => {
    if (newMessage !== '') {
      sendMessage(newMessage)
      setNewMessage('')
    }
  }

  // extra code to send the message as you press the enter key.
  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      if (newMessage !== '') {
        sendMessage(newMessage)
        setNewMessage('')
      }
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
              <li
                key={message.id}
                className={clsx(classes.message, message.isOwner ? classes.owner : classes.guest)}
              >
                <span>{message.body}</span>
              </li>
            ))}
          </ol>
          <div ref={messageRef} />
        </div>
        <div className={classes.action}>
          <TextField
            className={classes.messageInput}
            id="message"
            label="Message"
            placeholder="enter message here"
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
