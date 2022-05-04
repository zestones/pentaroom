import React, {
  useEffect, createRef, useContext, useState,
} from 'react'

import './ChatInput.scss'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import OutlinedInput from '@mui/material/OutlinedInput'
import { SocketContext } from '../../context/socket'

function ChatInput() {
  const socket = useContext(SocketContext)
  const inputRef = createRef()

  const [open, setOpen] = useState(false)
  const [send, setIsSend] = useState(false)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [inputRef])

  // handle the click on the button
  const handleClick = () => setOpen(true)

  // close the modal
  const handleClose = () => {
    setOpen(false)
    setIsSend(false)
  }

  // handle the message validation
  const handleValidation = () => {
    const message = inputRef.current.value
    if (!message) return

    setIsSend(true)

    socket.emit('message', message)
    inputRef.current.value = ''
  }

  // handle the enter click
  const handleKeyPressed = (e) => {
    setIsSend(false)

    if (e.key === 'Enter') {
      handleValidation()
    }
  }

  return (
    <>
      <Button
        variant="contained"
        className="chat-btn"
        onClick={handleClick}
      >
        Chat
      </Button>
      <Modal
        keepMounted
        disableAutoFocus
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-chat"
        aria-describedby="modal-chat"
        className="modal-chat"

      >
        <Box className="box-chat">
          <h2>Entrez un message pour le chat</h2>
          <OutlinedInput
            fullWidth
            type="text"
            inputRef={inputRef}
            placeholder="Tape le mot ici ..."
            onKeyPress={handleKeyPressed}
            color={send ? 'success' : ''}
          />
          <Button
            variant="contained"
            className="send-btn"
            onClick={handleValidation}
          >
            Envoyer
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default ChatInput
