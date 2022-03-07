import React, { useState, useEffect } from 'react'

import { v4 as uuid } from 'uuid'

import Drawer from '../drawer/Drawer'
import Chat from '../chat/Chat'
import SwitchRoleButton from '../switchRoleButton/SwitchRoleButton'
import UserInput from '../userInput/UserInput'
import Challenger from '../challenger/Challenger'

function UserView({
  setUserRole, socket, isConnected, users, messages, hiddenWord, userDrawer,
}) {
  // init all the used variables
  const [isDrawer, setIsDrawer] = useState(false)
  const events = {
    connect: 'connect',
    disconnect: 'disconnect',
    updateUsers: 'update-users',
    newMessage: 'new-message',
    findWord: 'find-word',
    drawerUsers: 'drawer-users',
  }

  const sendNewDrawer = () => {
    if (!socket) return

    const index = Math.floor(Math.random() * (users.length))
    const senderId = users[index].id

    socket.emit(events.drawerUsers, { id: senderId })
  }

  // send the message along with a sender id
  const sendMessage = (messageBody) => {
    if (!socket) return
    socket.emit(events.newMessage, {
      id: uuid(),
      body: messageBody,
      senderId: socket.id,
    })
  }

  // send a Word chosen from the list of word proposed
  const sendChosenWord = (myWord) => {
    if (!socket) return
    socket.emit(events.findWord, (myWord))
  }

  // Init the user who is going to draw
  useEffect(() => {
    if (!isDrawer && userDrawer !== undefined && userDrawer.id === socket.id) { setIsDrawer(true) }
  }, [userDrawer])

  // return our application
  return (
    <>
      {isDrawer
        ? (
          <Challenger
            socket={socket}
            setIsDrawer={setIsDrawer}
            sendChosenWord={sendChosenWord}
            sendNewDrawer={sendNewDrawer}
          />
        )
        : <UserInput hiddenWord={hiddenWord} /> }

      <Drawer
        userID={socket?.id}
        username={socket?.id}
        isConnected={isConnected}
        users={users}
      >
        <Chat messages={messages} sendMessage={sendMessage} setUserRole={setUserRole} />
      </Drawer>
      <SwitchRoleButton title="Switch mode" isDrawer={isDrawer} setIsDrawer={setIsDrawer} sendNewDrawer={sendNewDrawer} />
    </>
  )
}

export default UserView
