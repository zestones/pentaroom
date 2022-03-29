/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useContext } from 'react'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Avatar from 'react-nice-avatar'
import { SocketContext } from '../../context/socket'

const useStyles = makeStyles({
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
  pentaboy: {
    height: '50px',
    width: 'auto',
    objectFit: 'contain',
    position: 'relative',
    zIndex: '2',
    transform: 'rotate(-8deg)',
  },
})
function ListUsers() {
  const socket = useContext(SocketContext)
  const classes = useStyles()

  const [users, setUsers] = useState([])
  const [drawer, setDrawer] = useState()

  const isUserDrawer = (user) => (drawer !== undefined && user.id === drawer.id)

  const handleUpdateUsers = (listUsers) => {
    setUsers(listUsers)
  }

  const handleUpdateDrawer = (user) => {
    setDrawer(user)
  }

  useEffect(() => {
    socket.on('update-users', handleUpdateUsers)
    socket.on('updateDrawer', handleUpdateDrawer)

    return () => {
      socket.off('update-users', handleUpdateUsers)
      socket.off('updateDrawer', handleUpdateDrawer)
    }
  }, [socket])

  return (
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
  )
}
export default ListUsers
