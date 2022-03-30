/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext, useEffect } from 'react'
import Avatar from 'react-nice-avatar'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import { SocketContext } from '../../context/socket'

const useStyles = makeStyles({
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 24,
    padding: '15px',
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
})

function ListUsers() {
  const socket = useContext(SocketContext)
  const [users, setUsers] = useState([])
  const classes = useStyles()

  // get the number of users registered
  const getNumberUser = () => users.filter((user) => user.pseudo !== '').length

  const handleUpdateUsers = (listUsers) => {
    console.log(listUsers)
    setUsers(listUsers)
  }

  useEffect(() => {
    socket.on('update-users', handleUpdateUsers)

    return () => {
      socket.off('update-users', handleUpdateUsers)
    }
  }, [socket])

  return (
    <div>
      <h3>
        Utilsateurs :
        {getNumberUser()}
      </h3>

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

  )
}

export default ListUsers
