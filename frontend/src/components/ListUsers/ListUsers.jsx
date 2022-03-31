/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext, useEffect } from 'react'
import Avatar from 'react-nice-avatar'
import Box from '@mui/material/Box'
import { SocketContext } from '../../context/socket'
import './ListUsers.scss'

function ListUsers() {
  const socket = useContext(SocketContext)
  const [users, setUsers] = useState([])

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

      <ul className="listPlayers">
        {users.map((user) => (
          (user.avatar)
            && (
              <Box className="userBox">
                <Avatar fontSize="medium" className="userAvatar" {...user.avatar} />
                <li className="player" key={user.id}>{user.pseudo}</li>
              </Box>
            )
        ))}
      </ul>
    </div>

  )
}

export default ListUsers
