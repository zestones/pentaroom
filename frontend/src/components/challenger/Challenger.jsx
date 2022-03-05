/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { makeStyles } from '@mui/styles'
import Canvas from '../canvas/Canvas'

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

const style = {
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

function Challenger({ socket, setIsDrawer }) {
  const [open, setOpen] = useState(true)
  const [chosenWord, setChosenWord] = useState('')

  const words = ['Camion', 'Voiture', 'Pompier']

  const handleClose = (event) => {
    if (event.target.value !== '') {
      setChosenWord(event.target.value)
      console.log(chosenWord)
    } else {
      setIsDrawer(false)
    }
    setOpen(false)
  }

  const btn = words.map((word) => (
    <Button variant="contained" color="success" value={word} onClick={handleClose}>
      {word}
    </Button>
  ))

  const classes = useStyles()

  return (
    <>
      <Canvas socket={socket} />
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
          <Box sx={style}>
            <Stack className={classes.wordsProposition} direction="row" spacing={2}>
              {btn}
            </Stack>
            <Button className={classes.rejectProposition} variant="outlined" color="error" onClick={handleClose}>
              Refuser
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
export default Challenger
