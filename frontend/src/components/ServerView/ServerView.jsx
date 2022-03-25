/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Avatar from 'react-nice-avatar'
import Canvas from '../canvas/Canvas'
import ServerViewMessage from './ServerViewMessage'

const useStyles = makeStyles({
  row: {
    display: 'flex',
    height: '100%',
    padding: '1em',
  },
  column: {
    border: 'solid',
    width: '25%',
  },
  listPlayers: {
    listStyle: 'none',
    padding: '20px 1em',
    margin: '0',
    fontSize: 'x-large',
  },
  player: {
    textAlign: 'center',
    padding: '5px',
    '-webkit-text-stroke-width': '1px',
    '-webkit-text-stroke-color': 'black',
  },
  h1: {
    textAlign: 'center',
    '-webkit-text-stroke-width': '1px',
    '-webkit-text-stroke-color': 'black',

  },
  userAvatar: {
    color: 'transparent',
    backgroundColor: 'transparent',
    minWidth: '2rem',
    height: '2rem',
    marginRight: '5px',
    border: '1px solid black',
  },
  userBox: {
    display: 'flex',
    paddingBottom: '10px',
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
  pentaboy: {
    height: '50px',
    width: 'auto',
    objectFit: 'contain',
    position: 'relative',
    zIndex: '2',
    transform: 'rotate(-8deg)',
  },
})
function ServerView({
  socket, users, userRole, messages, userDrawer,
}) {
  const classes = useStyles()
  const messageRef = useRef()
  const isUserDrawer = (userId) => (userDrawer !== undefined && userId === userDrawer.id)

  // allow scrolling to the bottom of the container when a new message arrived.
  useEffect(() => messageRef.current.scrollIntoView({ behavior: 'smooth' }))

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
                {(isUserDrawer(user.id))
                      && <img src="/pentaboy.svg" alt="pentaboy" className={classes.pentaboy} />}
              </Box>
            )
          ))}
        </ul>
      </div>
      <Canvas socket={socket} userRole={userRole} />
      <div className={classes.messageContainer}>
        <h1 className={classes.h1}>Chat</h1>
        <ol className={classes.ol}>
          {messages.map((message) => (
            <ServerViewMessage key={message.id} message={message} />
          ))}
        </ol>
        <div ref={messageRef} />
      </div>
    </Box>
  )
}
export default ServerView
