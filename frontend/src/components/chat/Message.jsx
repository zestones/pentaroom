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
    marginTop: '10px',
    marginBottom: '0px',
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
    margin: '0px',
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
    color: 'black',
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
  guestMessageTime: {
    paddingLeft: '3em',
    margin: '0px',
    color: 'gray',
    fontSize: '15px',
  },
  ownerMessageTime: {
    padding: '0px',
    margin: '0px',
    color: 'gray',
    fontSize: '15px',
    marginLeft: 'auto',
    marginRight: '0',
    maxWidth: '80px',
  },
  ownerDisplay: {
    marginLeft: 'auto',
    marginRight: '0',
  },
})

function Message({ message }) {
  const classes = useStyles()

  const getMessageTime = () => {
    const separateDate = message.time.split(' ')
    const separateTime = separateDate[separateDate.length - 1].split(':')
    return `${separateTime[0]}:${separateTime[1]}`
  }
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
                className={clsx(classes.message, classes.guest)}
              >
                <span>{message.body}</span>
              </li>
              <p className={classes.guestMessageTime}>
                {getMessageTime()}
              </p>
            </div>
          </>
        )
        : (
          <div className={classes.ownerDisplay}>
            <li
              key={message.id}
              className={clsx(classes.message, classes.owner)}
            >
              <span>{message.body}</span>
            </li>
            <p className={classes.ownerMessageTime}>
              {getMessageTime()}
            </p>
          </div>
        )}

    </div>
  )
}
export default Message
