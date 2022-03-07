/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import Avatar from 'react-nice-avatar'

const useStyles = makeStyles({
  message: {
    listStyle: 'none',
  },
  owner: {
    margin: '1em',
    marginTop: '0px',
    backgroundColor: '#8BC34A',
    padding: '0.5em 1.5em',
    borderRadius: '20px',
    color: '#FFF',
    wordBreak: 'break-word',
    maxWidth: '65%',
    width: 'fit-content',
    marginLeft: 'auto',
  },
  guest: {
    margin: '0.5em',
    marginTop: '0px',
    backgroundColor: '#0091EA',
    padding: '0.5em 1.5em',
    borderRadius: '20px',
    color: '#FFF',
    wordBreak: 'break-word',
    maxWidth: '65%',
    width: 'fit-content',
    marginRight: 'auto',
  },
  guestUsername: {
    paddingTop: '0.5em',
    paddingLeft: '2em',
    margin: '0px',
    borderRadius: '20px',
    color: 'gray',
    maxWidth: '65%',
    width: 'fit-content',
    marginRight: 'auto',
  },
  guestAvatar: {
    color: 'transparent',
    backgroundColor: 'transparent',
    width: '2rem',
    height: '2rem',
  },
  messageDisplay: {
    display: 'flex',
    flexDirection: 'row',
  },
  guestDisplay: {
    flexDirection: 'column',
  },

})

function Message({ message }) {
  const classes = useStyles()

  return (
    <div className={classes.messageDisplay}>
      {(!message.isOwner)
        ? (
          <>
            <Avatar fontSize="medium" className={classes.guestAvatar} {...message.avatar} />
            <div className={classes.guestDisplay}>
              <h5 className={
                clsx(classes.message, classes.guestUsername)
              }
              >
                {message.pseudo}
              </h5>
              <li
                key={message.id}
                className={clsx(classes.message, message.isOwner ? classes.owner : classes.guest)}
              >
                <span>{message.body}</span>
              </li>
            </div>
          </>
        )
        : (
          <li
            key={message.id}
            className={clsx(classes.message, message.isOwner ? classes.owner : classes.guest)}
          >
            <span>{message.body}</span>
          </li>
        )}

    </div>
  )
}
export default Message
