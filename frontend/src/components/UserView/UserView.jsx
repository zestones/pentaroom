import React, { useState } from 'react'

import { v4 as uuid } from 'uuid'

import Drawer from '../drawer/Drawer'
import Chat from '../chat/Chat'
import SwitchRoleButton from '../switchRoleButton/SwitchRoleButton'
import UserInput from '../userInput/UserInput'
import Challenger from '../challenger/Challenger'

function UserView({
  userRole, socket, isConnected, users, messages, hiddenWord,
}) {
  // init all the used variables
  const [isDrawer, setIsDrawer] = useState(false)
  const events = {
    connect: 'connect',
    disconnect: 'disconnect',
    updateUsers: 'update-users',
    newMessage: 'new-message',
    findWord: 'find-word',
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

  // return our application
  return (
    <>
      {isDrawer
        ? (
          <Challenger
            socket={socket}
            setIsDrawer={setIsDrawer}
            sendChosenWord={sendChosenWord}
          />
        ) : <UserInput hiddenWord={hiddenWord} />}

      <Drawer
        userID={socket?.id}
        username={socket?.id}
        userRole={userRole}
        isConnected={isConnected}
        users={users}
      >
        <Chat messages={messages} sendMessage={sendMessage} />
      </Drawer>

      <SwitchRoleButton title="Switch mode" isDrawer={isDrawer} setIsDrawer={setIsDrawer} />
    </>
  )
}
export default UserView
