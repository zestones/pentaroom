/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import Avatar from 'react-nice-avatar'
import './Message.scss'

function Message({ message }) {
  const getMessageTime = () => {
    const date = new Date(message.time)
    return `${date.getHours()}:${date.getMinutes()}`
  }
  return (
    <div className="messageDisplay">
      {(!message.isOwner)
        ? (
          <>
            <Avatar fontSize="medium" className="guestAvatar" {...message.avatar} />
            <div className="guestDisplay">
              <h5 className="message guestUsername">
                {message.pseudo}
              </h5>
              <li
                key={message.id}
                className="message guest"
              >
                <span>{message.body}</span>
              </li>
              <p className="guestMessageTime">
                {getMessageTime()}
              </p>
            </div>
          </>
        )
        : (
          <div className="ownerDisplay">
            <li
              key={message.id}
              className="message owner"
            >
              <span>{message.body}</span>
            </li>
            <p className="ownerMessageTime">
              {getMessageTime()}
            </p>
          </div>
        )}

    </div>
  )
}
export default Message
