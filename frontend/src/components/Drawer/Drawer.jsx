import React, { useState, useEffect, useContext } from 'react'
import './Drawer.scss'

import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Canvas from '../Canvas/Canvas'
import Timer from '../Timer/Timer'
import Alert from '../Alert/Alert'
import { SocketContext } from '../../context/socket'

function Drawer({ setIsChallenged, words }) {
  const socket = useContext(SocketContext)

  const [open, setIsOpen] = useState(true)
  const [time, setTime] = useState(-1)

  const [alert, setAlert] = useState({
    open: false,
    title: 'Temps écoulé',
    text: 'Le temps pour dessiner est écoulé... \n Appuyez sur une touche pour relancer une partie',
    type: 'danger',
  })
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
    setIsChallenged(false)
    socket.emit('new-drawer')
  }

  const handleDecline = () => {
    setIsChallenged(false)
    socket.emit('refuse-challenge')
  }

  const handleAccept = (button) => {
    const word = button.target.value
    setIsOpen(false)
    socket.emit('accept-challenge', word)
    console.log(`Mot choisis: ${word}`)
  }

  const handleUpdateDrawer = () => {
    setIsChallenged(false)
  }

  const handleTimeLeft = (newTime) => setTime(newTime)

  const handleNoTimeLeft = () => {
    setAlert({ ...alert, open: true, time: 5 })
  }

  useEffect(() => {
    socket.on('update-drawer', handleUpdateDrawer)
    socket.on('time-left', handleTimeLeft)
    socket.on('no-time-left', handleNoTimeLeft)

    return () => {
      socket.off('update-drawer', handleUpdateDrawer)
      socket.off('time-left', handleTimeLeft)
      socket.off('no-time-left', handleNoTimeLeft)
    }
  }, [socket])

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
      <Alert
        type={alert.type}
        open={alert.open}
        handleClose={handleCloseAlert}
        title={alert.title}
        text={alert.text}
        time={alert.time}
      />
      <Timer time={time} />
      <Canvas userRole="client" />
    </>
  )
}
export default Drawer
