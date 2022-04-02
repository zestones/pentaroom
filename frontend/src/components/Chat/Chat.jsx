import React, { useRef, useContext } from 'react'
import './Chat.scss'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import OutlinedInput from '@mui/material/OutlinedInput'
import { SocketContext } from '../../context/socket'

function Chat() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const inputRef = useRef('')
  const socket = useContext(SocketContext)

  const handleValidation = () => {
    const message = inputRef.current.value
    if (!message) return
    socket.emit('message', message)
    inputRef.current.value = ''
  }

  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleValidation()
    }
  }

  return (
    <>
      <Button
        variant="contained"
        className="chat-btn"
        onClick={handleOpen}
      >
        Chat
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-chat"
        aria-describedby="modal-chat"
        className="modal-chat"

      >
        <Box className="box-chat">
          <h2>Entrez un message pour le chat</h2>
          <OutlinedInput
            inputRef={inputRef}
            fullWidth
            placeholder="Tape le mot ici ..."
            className="input-word"
            onKeyPress={handleKeyPressed}
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

export default Chat
