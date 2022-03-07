import React, { useState } from 'react'

import { v4 as uuid } from 'uuid'

import Drawer from '../drawer/Drawer'
import Chat from '../chat/Chat'
import SwitchRoleButton from '../switchRoleButton/SwitchRoleButton'
import UserInput from '../userInput/UserInput'
import Canvas from '../canvas/Canvas'

function UserView({
  setUserRole, socket, isConnected, users, messages,
}) {
  // init all the used variables
  const [isDrawer, setIsDrawer] = useState(false)

  const events = {
    connect: 'connect',
    disconnect: 'disconnect',
    updateUsers: 'update-users',
    newMessage: 'new-message',
  }

  const getUsername = () => {
    const index = users.map((x) => x.id).indexOf(socket.id)
    return users[index].pseudo
  }

  const getUserAvatar = () => {
    const index = users.map((x) => x.id).indexOf(socket.id)
    return users[index].avatar
  }

  // send the messagee along with a sender id
  const sendMessage = (messageBody) => {
    if (!socket) return
    socket.emit(events.newMessage, {
      id: uuid(),
      body: messageBody,
      senderId: socket.id,
      pseudo: getUsername(),
      avatar: getUserAvatar(),
    })
  }

  // return our application
  return (
    <>
      {isDrawer ? <Canvas socket={socket} /> : <UserInput />}

      <Drawer
        userID={socket?.id}
        isConnected={isConnected}
        users={users}
      >
        <Chat
          messages={messages}
          sendMessage={sendMessage}
          setUserRole={setUserRole}
        />
      </Drawer>

      <SwitchRoleButton title="Switch mode" isDrawer={isDrawer} setIsDrawer={setIsDrawer} />
    </>
  )
}
export default UserView
