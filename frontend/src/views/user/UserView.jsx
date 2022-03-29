import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import PlayerView from '../player/PlayerView'
import DrawerView from '../drawer/DrawerView'

import { SocketContext } from '../../context/socket'

const useStyles = makeStyles({
  row: {
    display: 'flex',
    height: '100%',
    padding: '1em',
  },
})

function UserView() {
  const socket = useContext(SocketContext)
  console.log(socket)
  const classes = useStyles()

  const [drawer, setDrawer] = useState()

  const isDrawer = () => (drawer && drawer.id === socket.id)

  const handleUpdateDrawer = (user) => {
    setDrawer(user)
  }

  useEffect(() => {
    socket.on('updateDrawer', handleUpdateDrawer)

    return () => {
      socket.off('updateDrawer', handleUpdateDrawer)
    }
  }, [socket])

  return (
    <Box className={classes.row}>
      {
        isDrawer()
          ? <DrawerView />
          : <PlayerView />
      }
    </Box>
  )
}

export default UserView
