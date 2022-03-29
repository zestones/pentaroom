import React, { useState } from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import Chat from './Chat'

const useStyles = makeStyles({
  button: {
    position: 'absolute',
    bottom: '25px',
    right: '25px',
  },
  box: {
    width: '500px',
    maxWidth: '100vw',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
})

function Drawer() {
  const classes = useStyles()

  const [isOpen, setOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (
      event
      && event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setOpen(open)
  }

  return (
    <>
      <Button
        variant="contained"
        className={classes.button}
        onClick={toggleDrawer(true)}
      >
        Chat

      </Button>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          className={classes.box}
          role="presentation"
        >
          <Chat />

        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default Drawer
