import React, { useContext } from 'react'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import { SocketContext } from '../../context/socket'
import Canvas from '../../components/canvas/Canvas'

import ListUsers from './ListUsers'
import ListMessages from './ListMessages'

const useStyles = makeStyles({
  row: {
    display: 'flex',
    height: '100%',
    padding: '1em',
  },
  listPlayers: {
    listStyle: 'none',
    padding: '20px 1em',
    margin: '0',
    fontSize: 'x-large',
  },
  h1: {
    textAlign: 'center',
    '-webkit-text-stroke-width': '1px',
    '-webkit-text-stroke-color': 'black',

  },
  ol: {
    padding: '0',
  },
  messageContainer: {
    width: '25%',
    overflowY: 'auto',
    height: '100%%',
    border: 'solid',
  },
})
function ServerView() {
  const socket = useContext(SocketContext)
  const classes = useStyles()

  return (
    <Box className={classes.row}>
      <ListUsers />
      <Canvas socket={socket} userRole="server" />
      <ListMessages />
    </Box>
  )
}
export default ServerView
