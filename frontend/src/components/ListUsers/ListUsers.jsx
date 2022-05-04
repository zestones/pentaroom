/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState, useContext, useEffect, useMemo,
} from 'react'
import Avatar from 'react-nice-avatar'
import clsx from 'clsx'
import styles from './ListUsers.module.scss'

import { SocketContext } from '../../context/socket'

function ListUsers({ title, order = false }) {
  const socket = useContext(SocketContext)
  const [users, setUsers] = useState([])
  const [drawerId, setDrawerId] = useState(null)

  /**
   * sort the users when the drawer change
   */
  useMemo(() => {
    users.sort((user1, user2) => user2.score - user1.score)
    users.sort((x, y) => (x.id === drawerId ? -1 : y.id === drawerId ? 1 : 0))
  })

  /**
   *
   * @returns the number of users registered
   */
  const getNumberUser = () => users.filter((user) => user.pseudo !== '').length

  /**
   * update the users when update-users is emited
   * @param {*} listUsers
   */
  const handleUpdateUsers = (listUsers) => {
    if (order) {
      listUsers.sort((user1, user2) => user2.score - user1.score)
    }
    setUsers(listUsers)
  }

  /**
   * check if user is fully registered
   * @param {*} user
   * @returns
   */
  const isRegister = (user) => user.pseudo !== undefined && user.pseudo !== ''

  /**
   * update the current drawer
   * @param {*} challenge
   * @returns
   */
  const handleUpdateDrawer = (challenge) => setDrawerId(challenge.userId)

  useEffect(() => {
    socket.on('update-users', handleUpdateUsers)
    socket.on('challenge', handleUpdateDrawer)
    socket.emit('get-users')
    return () => {
      socket.off('update-users', handleUpdateUsers)
      socket.off('challenge', handleUpdateDrawer)
    }
  }, [socket])

  return (
    <div className={styles.listUsersContainer}>
      {title && <h2 className={styles.listUsersTitle}>{title}</h2>}

      <h3 className={styles.nbUsers}>
        Utilsateurs :
        {getNumberUser()}
      </h3>

      <ul className={styles.listUsers}>
        {users.map((user) => (
          (isRegister(user))
          && (
            <li
              key={user.id}
              className={
                clsx(styles.userContainer, (drawerId === user.id) && styles.userDrawer)
              }
            >
              <Avatar fontSize="medium" className={styles.avatar} {...user.avatar} />
              <p className={styles.pseudo} key={user.id}>{user.pseudo}</p>
              {drawerId === user.id && <img src="/pentaboy.svg" alt="pentaboy" className={styles.pentaboy} />}
              <p className={styles.score}>{user.score}</p>
            </li>
          )
        ))}
      </ul>
    </div>

  )
}

export default ListUsers
