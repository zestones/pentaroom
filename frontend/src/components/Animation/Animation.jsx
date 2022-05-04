/* eslint-disable consistent-return */
import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import './Animation.scss'

function Animation({
  path, type, open, handleClose,
}) {
  /**
   * handle the key pressed
   * @param {Event} e
   */
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
      <Box className={`animation-box ${type}`}>
        <img src={path} alt="pentanimation" className="pentaboy" />
      </Box>
    </Modal>
  )
}

export default Animation
