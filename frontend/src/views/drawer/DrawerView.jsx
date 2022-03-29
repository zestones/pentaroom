/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import Canvas from '../../components/canvas/Canvas'

/** Canvas Styles */
const useStyles = makeStyles({
  wordsProposition: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectProposition: {
    position: 'absolute',
    right: 35,
    bottom: 35,
  },
})

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '25%',
  backgroundColor: '#404040',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function DrawerView() {
  const classes = useStyles()

  return (
    <>
      <Canvas userRole="client" />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open="true"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in="true">
          <Box sx={modalStyle}>
            <Button className={classes.rejectProposition} variant="outlined" color="error">
              Refuser
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
export default DrawerView
