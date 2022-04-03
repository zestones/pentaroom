import React from 'react'

import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

import './Alert.scss'

function Alert({
  type, open, handleClose, title, text,
}) {
  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      handleClose()
    }
  }

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

        <Typography sx={{ mt: 2 }}>
          {text}
        </Typography>
        <img src="/pentaboy.svg" alt="pentaboy" className="pentaboy" />
      </Box>
    </Modal>
  )
}

export default Alert
