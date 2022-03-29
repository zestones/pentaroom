import React, { useState } from 'react'
import './Chat.scss'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import ListMessages from '../ListMessages/ListMessages'

function Chat() {
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
        className="chat-btn"
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
          className="box"
          role="presentation"
        >
          <ListMessages />
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default Chat
