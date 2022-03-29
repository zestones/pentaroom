import React, { useState } from 'react'
import './Drawer.scss'

import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
// import { SocketContext } from '../../context/socket'
import Canvas from '../Canvas/Canvas'

function Drawer({ setIsChallenged, words }) {
//   const socket = useContext(SocketContext)
  const [open, setIsOpen] = useState(true)

  let chosenWord = null

  const handleDecline = () => {
    setIsChallenged(false)
  }

  const handleAccept = (word) => {
    // socket.emit('set-chosen-word', word)
    setIsOpen(false)
    chosenWord = word
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

      <h1>
        Le mot que vous avez choisis est
        {chosenWord}
      </h1>
      <Canvas userRole="client" />
    </>
  )
}
export default Drawer
