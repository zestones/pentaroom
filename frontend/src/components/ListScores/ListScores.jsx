/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useContext } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Avatar from 'react-nice-avatar'
import styles from './ListScores.module.scss'

import { SocketContext } from '../../context/socket'

function Stars({ nb }) {
  return (
    <div className={styles.starsContainer}>
      {[...Array(nb)].map(() => <svg className={styles.star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" /></svg>)}
    </div>

  )
}

function ListScores({ handleClose }) {
  const socket = useContext(SocketContext)

  const [users, setUsers] = useState([])

  // handle the users score
  const handleScores = (newUsers) => {
    newUsers.sort((user1, user2) => user2.score - user1.score)
    setUsers(newUsers)
  }

  useEffect(() => {
    socket.on('scores', handleScores)
    socket.emit('scores')

    return () => {
      socket.off('scores', handleScores)
    }
  }, [])

  return (
    users.length > 0 && (
      <TableContainer className={styles.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Pseudo</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Classement</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
              >
                <TableCell className={styles.avatarCell}><Avatar fontSize="medium" className={styles.avatar} {...user.avatar} /></TableCell>
                <TableCell className={styles.pseudoCell}>{user.pseudo}</TableCell>
                <TableCell className={styles.scoreCell}>{user.score}</TableCell>
                <TableCell className={styles.positionCell}>
                  {index + 1}
                  {index < 3 && <Stars nb={3 - index} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <button className={styles.close} type="button" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" /></svg>
        </button>
      </TableContainer>
    )
  )
}
export default ListScores
