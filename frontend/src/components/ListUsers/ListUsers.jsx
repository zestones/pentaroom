/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext, useEffect } from 'react'
import Avatar from 'react-nice-avatar'
import { SocketContext } from '../../context/socket'
import styles from './ListUsers.module.scss'

function ListUsers({ title, order = false }) {
  const socket = useContext(SocketContext)
  const [users, setUsers] = useState([])

  // get the number of users registered
  const getNumberUser = () => users.filter((user) => user.pseudo !== '').length

  const handleUpdateUsers = (listUsers) => {
    if (order) {
      listUsers.sort((user1, user2) => user2.score - user1.score)
    }
    setUsers(listUsers)
  }

  const isRegister = (user) => user.pseudo !== undefined && user.pseudo !== ''

  useEffect(() => {
    socket.on('update-users', handleUpdateUsers)

    return () => {
      socket.off('update-users', handleUpdateUsers)
    }
  }, [socket])

  return (
    <div className={styles.listUsersContainer}>
      {title && <h2 className={styles.listUsersTitle}>{title}</h2> }
      <h3 className={styles.nbUsers}>
        Utilsateurs :
        {' '}
        {getNumberUser()}
      </h3>

      <ul className={styles.listUsers}>
        {users.map((user) => (
          (isRegister(user))
            && (
              <li key={user.id} className={styles.userContainer}>
                <Avatar fontSize="medium" className={styles.avatar} {...user.avatar} />
                <p className={styles.pseudo} key={user.id}>{user.pseudo}</p>
                <p className={styles.score}>{user.score}</p>
              </li>
            )
        ))}
      </ul>
    </div>

  )
}

export default ListUsers
