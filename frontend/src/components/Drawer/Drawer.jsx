import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
// import { SocketContext } from '../../context/socket'
import Canvas from '../Canvas/Canvas'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    minHeight: '100%',
    padding: '30px 0',
  },
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
  modal: {

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
  },
})

function Drawer({ setIsChallenged, words }) {
//   const socket = useContext(SocketContext)
  const classes = useStyles()
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
          <Box className={classes.modal}>
            <Stack className={classes.wordsProposition} direction="row" spacing={2}>
              {words.map((word) => (
                <Button key={word} variant="contained" color="success" value={word} onClick={handleAccept}>
                  {word}
                </Button>
              ))}
            </Stack>
            <Button className={classes.rejectProposition} variant="outlined" color="error" onClick={handleDecline}>
              Refuser
            </Button>
          </Box>
        </Fade>
      </Modal>

      <h1>
        Le mot que vous avez choisis est
        {' '}
        {chosenWord}
      </h1>
      <Canvas userRole="client" />
    </>
  )
}
export default Drawer
