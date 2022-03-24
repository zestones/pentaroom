/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Avatar from 'react-nice-avatar'
import Canvas from '../canvas/Canvas'

const useStyles = makeStyles({
  row: {
    display: 'flex',
    height: '100%',
    padding: '1em',
  },
  column: {
    padding: '1em',
    border: 'solid',
    width: '25%',
  },
  listPlayers: {
    listStyle: 'none',
    padding: '20px 0',
    margin: '0',
    fontSize: 'x-large',
  },
  player: {
    textAlign: 'center',
    padding: '5px',
  },
  h1: {
    textDecoration: 'underline white',
    textAlign: 'center',
  },
  userAvatar: {
    color: 'transparent',
    backgroundColor: 'transparent',
    minWidth: '2rem',
    height: '2rem',
    marginRight: '5px',
  },
  userBox: {
    display: 'flex',
    paddingBottom: '10px',
  },
})
function ServerView({ socket, users, userRole }) {
  const classes = useStyles()
  return (
    <Box className={classes.row}>
      <div className={classes.column}>
        <h1 className={classes.h1}>Joueurs</h1>
        <ul className={classes.listPlayers}>
          {users.map((user) => (
            (user.avatar)
            && (
              <Box className={classes.userBox}>
                <Avatar fontSize="medium" className={classes.userAvatar} {...user.avatar} />
                <li className={classes.player} key={user.id}>{user.pseudo}</li>
              </Box>
            )
          ))}
        </ul>
      </div>
      <Canvas socket={socket} userRole={userRole} />
    </Box>
  )
}
export default ServerView
