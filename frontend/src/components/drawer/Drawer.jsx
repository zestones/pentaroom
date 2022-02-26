import React, { useState } from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import ListUsers from '../listUsers/ListUsers'
import UserInfos from '../userInfos/UserInfos'

function Drawer({
  userRole, isConnected, users, children,
}) {
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
    <div>
      <Button
        sx={{
          position: 'absolute',
          bottom: '25px',
          right: '25px',
        }}
        onClick={toggleDrawer(true)}
        variant="contained"
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
          sx={{
            width: '500px',
          }}
          role="presentation"
        >
          <UserInfos userRole={userRole} isConnected={isConnected} />
          <ListUsers users={users} />
          {children}
        </Box>
      </SwipeableDrawer>
    </div>
  )
}

export default Drawer
