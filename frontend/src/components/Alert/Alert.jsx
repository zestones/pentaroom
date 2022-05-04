/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react'

import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

import './Alert.scss'

function Alert({
  type, open, handleClose, title, text, time,
}) {
  const [timeLeft, setTimeLeft] = useState(-1)

  /**
   * handle key pressed event
   * @param {Event} e
   */
  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleClose()
    }
  }

  useEffect(() => {
    setTimeLeft(time)
  }, [time])

  useEffect(() => {
    let interval
    if (timeLeft > -1) {
      interval = setInterval((prevTimeLeft) => {
        if (prevTimeLeft - 1 < 0) {
          clearInterval(interval)
          handleClose()
        } else {
          setTimeLeft(prevTimeLeft - 1)
        }
      }, 1000, timeLeft)
    }

    return () => clearInterval(interval)
  }, [timeLeft])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-alert"
      aria-describedby="modal-alert"
      onKeyPress={handleKeyPressed}
    >
      <Box className={`alert-box ${type}`}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }} style={{ whiteSpace: 'pre-line' }}>
          {timeLeft !== undefined ? `${text} \n (${timeLeft}s)` : text}
        </Typography>
        <img src="/pentaboy.svg" alt="pentaboy" className="pentaboy" />
      </Box>
    </Modal>
  )
}

export default Alert
