/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import Avatar from 'react-nice-avatar'
import styles from './Message.module.scss'

function Message({ message }) {
  const getMessageTime = () => {
    const date = new Date(message.time)
    return `${date.getHours()}:${date.getMinutes()}`
  }

  if (message.owner === null) return null

  return (
    <div className={styles.message}>
      <Avatar fontSize="medium" className={styles.avatar} {...message.owner.avatar} />
      <div className={styles.content}>
        <h5 className={styles.pseudo}>{message.owner.pseudo}</h5>
        <p className={styles.text}>{message.body}</p>
        <p className={styles.time}>{getMessageTime()}</p>
      </div>
    </div>
  )
}
export default Message
