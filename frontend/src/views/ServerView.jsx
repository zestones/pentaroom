import React from 'react'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Header from '../components/Header/Header'
import Canvas from '../components/Canvas/Canvas'
import ListUsers from '../components/ListUsers/ListUsers'
import ListMessages from '../components/ListMessages/ListMessages'

const useStyles = makeStyles({
  row: {
    display: 'flex',
    height: '100%',
    padding: '1em',
  },
})

function ServerView() {
  const classes = useStyles()

  return (
    <>

      <Header />
      <Box className={classes.row}>

        <ListUsers />
        <Canvas userRole="server" />
        <ListMessages />
      </Box>
    </>
  )
}
export default ServerView
