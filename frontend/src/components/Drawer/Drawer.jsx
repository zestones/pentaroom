import React, { useState, useEffect, useContext } from 'react'

import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import styles from './Drawer.module.scss'
import Canvas from '../Canvas/Canvas'
import Alert from '../Alert/Alert'
import { SocketContext } from '../../context/socket'

function Drawer({ setIsChallenged, words }) {
  const socket = useContext(SocketContext)

  const [canvasActive, setCanvasActive] = useState(false)

  const [open, setIsOpen] = useState(true)
  const [timeModal, setTimeModal] = useState(10)

  const [alert, setAlert] = useState({
    open: false,
    title: 'Temps écoulé',
    text: 'Le temps pour dessiner est écoulé... \n Appuyez sur une touche pour relancer une partie',
    type: 'danger',
  })

  // close the alert
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
    setIsChallenged(false)
    socket.emit('new-drawer')
  }

  // decline the challenge
  const handleDecline = () => {
    setIsChallenged(false)
    socket.emit('refuse-challenge')
  }

  // accept the challenge
  const handleAccept = (button) => {
    const word = button.target.value
    setIsOpen(false)
    socket.emit('accept-challenge', word)
    setCanvasActive(true)
    setTimeModal(-1)
  }

  // update the drawer
  const handleUpdateDrawer = () => setIsChallenged(false)

  // handle the timer when no time is left
  const handleNoTimeLeft = () => setAlert({ ...alert, open: true, time: 5 })

  useEffect(() => {
    socket.on('update-drawer', handleUpdateDrawer)
    socket.on('no-time-left', handleNoTimeLeft)

    return () => {
      socket.off('update-drawer', handleUpdateDrawer)
      socket.off('no-time-left', handleNoTimeLeft)
    }
  }, [socket])

  useEffect(() => {
    setTimeModal(timeModal)
  }, [timeModal])

  useEffect(() => {
    let interval
    if (timeModal > -1) {
      interval = setInterval((prevTimeLeft) => {
        if (prevTimeLeft - 1 < 0) {
          clearInterval(interval)
          handleDecline()
        } else {
          setTimeModal(prevTimeLeft - 1)
        }
      }, 1000, timeModal)
    }

    return () => clearInterval(interval)
  }, [timeModal])

  return (
    <>
      <Modal
        aria-labelledby={styles.transitionModalTitle}
        aria-describedby={styles.transitionModalDescription}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={styles.modal}>
            <h2>Choisis un mot !</h2>
            <Stack className={styles.wordsProposition} direction="row" spacing={2}>
              {words.map((word) => (
                <Button key={word} variant="contained" className={styles.wordBtn} value={word} onClick={handleAccept}>
                  {word}
                </Button>
              ))}
            </Stack>
            <span className={styles.timerContainer}>
              <Typography sx={{ mt: 1 }} className={styles.timer}>
                {timeModal !== undefined && timeModal}
              </Typography>
            </span>
            <Button className={styles.rejectProposition} variant="contained" color="error" onClick={handleDecline}>
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
      {canvasActive && <Canvas userRole="client" />}

    </>
  )
}
export default Drawer
