import React, { useState, useContext } from 'react'
import './Drawer.scss'

import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Canvas from '../Canvas/Canvas'
import { SocketContext } from '../../context/socket'

function Drawer({ setIsChallenged, words }) {
  const socket = useContext(SocketContext)

  const [open, setIsOpen] = useState(true)

  const handleDecline = () => {
    setIsChallenged(false)
    socket.emit('refuse-challenge')
  }

  const handleAccept = (button) => {
    const word = button.target.value
    console.log(word)
    setIsOpen(false)
    socket.emit('accept-challenge', word)
    console.log(`Mot choisis: ${word}`)
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="modal">
            <Stack className="words-proposition" direction="row" spacing={2}>
              {words.map((word) => (
                <Button key={word} variant="contained" color="success" value={word} onClick={handleAccept}>
                  {word}
                </Button>
              ))}
            </Stack>
            <Button className="reject-proposition" variant="outlined" color="error" onClick={handleDecline}>
              Refuser
            </Button>
          </Box>
        </Fade>
      </Modal>
      <Canvas userRole="client" />
    </>
  )
}
export default Drawer
