import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({

  listUsers: {
    listStyle: 'none',
    padding: '20px 0',
    margin: '0',
    textAlign: 'center',
  },
  currentUser: {
    color: 'purple',
  },
})

function Userlist({ users, userID }) {
  const classes = useStyles()
  return (
    <ul className={classes.listUsers}>
      {users.map((user) => (
        <li className={user.id === userID && classes.currentUser} key={user.id}>
          {user.pseudo}

        </li>
      ))}
    </ul>
  )
}

export default Userlist
