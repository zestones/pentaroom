import React, { useState, useContext, useEffect } from 'react'
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
  listUsers: {
    listStyle: 'none',
    padding: '20px 0',
    margin: '0',
    textAlign: 'center',
  },
})

function ListUsers() {
  const socket = useContext(SocketContext)
  const [users, setUsers] = useState([])
  const classes = useStyles()

  // get the number of users registered
  const getNumberUser = () => users.filter((user) => user.pseudo !== '').length

  const handleUpdateUsers = (listUsers) => {
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
      <h2 className={classes.button}>
        Utilsateurs :
        {getNumberUser()}
      </h2>

      <Box className={classes.box}>
        <ul className={classes.listUsers}>
          {users.map((user) => (
            <li key={user.id}>
              {user.pseudo}
            </li>
          ))}
        </ul>
      </Box>
    </div>
  )
}

export default ListUsers
