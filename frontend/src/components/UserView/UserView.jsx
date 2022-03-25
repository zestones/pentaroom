import React, { useState, useEffect } from 'react'

import { v4 as uuid } from 'uuid'

import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Drawer from '../drawer/Drawer'
import Chat from '../chat/Chat'
import SwitchRoleButton from '../switchRoleButton/SwitchRoleButton'
import UserInput from '../userInput/UserInput'
import Challenger from '../challenger/Challenger'

const useStyles = makeStyles({
  row: {
    display: 'flex',
    height: '100%',
    padding: '1em',
    backgroundColor: '#fff0',
  },
})

function UserView({
  setUserRole, socket, isConnected, users, messages, hiddenWord, userDrawer,
}) {
  // init all the used variables
  const [isDrawer, setIsDrawer] = useState(false)
  const classes = useStyles()

  const events = {
    connect: 'connect',
    disconnect: 'disconnect',
    updateUsers: 'update-users',
    newMessage: 'new-message',
    findWord: 'find-word',
    drawerUsers: 'drawer-users',
    registration: 'registration',
  }

  const getUsername = () => {
    const index = users.map((x) => x.id).indexOf(socket.id)
    return users[index].pseudo
  }

  const getUserAvatar = () => {
    const index = users.map((x) => x.id).indexOf(socket.id)
    return users[index].avatar
  }

  // Check if the user is fully registered (Pseudo + Avatar)
  const isFullyRegistered = (index) => {
    if (users[index].pseudo === '' || users[index].avatar === undefined) return false
    return true
  }

  const sendNewDrawer = () => {
    if (!socket) return

    const index = Math.floor(Math.random() * (users.length))
    const senderId = users[index].id

    if (isFullyRegistered(index)) {
      socket.emit(events.drawerUsers, { id: senderId })
    } else sendNewDrawer()
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
      time: new Date(),
    })
  }

  // send a Word chosen from the list of word proposed
  const sendChosenWord = (myWord) => {
    if (!socket) return
    socket.emit(events.findWord, (myWord))
  }

  const sendUserDrawerId = () => {
    if (!socket) return

    socket.emit(events.drawerUsers, { id: socket.id })
  }

  // Init the user who is going to draw
  useEffect(() => {
    if (!isDrawer && userDrawer !== undefined && userDrawer.id === socket.id) { setIsDrawer(true) }
  }, [userDrawer])

  // return our application
  return (
    <Box className={classes.row}>
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
        isConnected={isConnected}
        users={users}
      >
        <Chat
          messages={messages}
          sendMessage={sendMessage}
          setUserRole={setUserRole}
        />
      </Drawer>
      <SwitchRoleButton title="Switch mode" isDrawer={isDrawer} setIsDrawer={setIsDrawer} sendNewDrawer={sendNewDrawer} sendUserDrawerId={sendUserDrawerId} />
    </Box>
  )
}

export default UserView
