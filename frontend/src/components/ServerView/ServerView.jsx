import React from 'react'
import { makeStyles } from '@mui/styles'
import Canvas from '../canvas/Canvas'
import Userlist from '../userlist/Userlist'

const useStyles = makeStyles({
  row: {
    display: 'flex',
    height: '100%',
  },
  column: {
    flex: '1',
    padding: '1em',
    border: 'solid',
  },
})
function ServerView({ socket, users }) {
  const classes = useStyles()
  return (
    <div className={classes.row}>
      <div className={classes.column}>
        <h1> Listes des Utilisateurs </h1>
        <Userlist users={users} />
      </div>
      <Canvas socket={socket} />
    </div>
  )
}
export default ServerView
