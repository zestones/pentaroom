import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  message: {
    listStyle: 'none',
  },
  guest: {
    margin: '0px',
    marginTop: '0px',
    backgroundColor: '#fc0',
    padding: '0.5em 1.5em',
    borderRadius: '20px',
    color: '#0085FF',
    wordBreak: 'break-word',
    marginRight: 'auto',
    width: '100%',
  },
  guestUsername: {
    paddingTop: '0.5em',
    paddingLeft: '1em',
    margin: '0px',
    borderRadius: '20px',
    color: 'black',
    maxWidth: '65%',
    overflow: 'hidden',
    paddingBottom: '5px',

  },
  guestAvatar: {
    color: 'transparent',
    backgroundColor: 'transparent',
    width: '2rem',
    height: '2rem',
    marginRight: '5px',
  },
  messageDisplay: {
    fontFamily: 'Sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestDisplay: {
    padding: '15px 15px',
    width: '100%',
  },
  guestMessageTime: {
    paddingLeft: '1em',
    margin: '0px',
    color: 'gray',
    fontSize: '15px',
    marginLeft: '0',
    marginRight: 'auto',
    maxWidth: '80px',
    paddingTop: '5px',
  },
})

function ServerViewMessage({ message }) {
  const classes = useStyles()

  const getMessageTime = () => {
    const date = new Date(message.time)
    return `${date.getHours()}:${date.getMinutes()}`
  }
  return (
    <div className={classes.messageDisplay}>
      <div className={classes.guestDisplay}>
        <h5 className={
          clsx(classes.message, classes.guestUsername)
        }
        >
          {message.pseudo}
        </h5>
        <li
          key={message.id}
          className={clsx(classes.message, classes.guest)}
        >
          <span>{message.body}</span>
        </li>
        <p className={classes.guestMessageTime}>
          {getMessageTime()}
        </p>
      </div>

    </div>
  )
}
export default ServerViewMessage
