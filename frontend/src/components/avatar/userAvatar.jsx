/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'

import Button from '@mui/material/Button'
import Avatar from 'react-nice-avatar'
import { Stack } from '@mui/material'
import UserView from '../UserView/UserView'
import AvatarColor from './AvatarColor'
import AvatarAttribute from './AvatarAttribute'

const useStyles = makeStyles({
  avatar: {
    border: 'thick double black',
    width: '5rem',
    height: '5rem',
  },
  container: {
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
    flexDirection: 'column',

  },
  subcontainer: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerText: {
    textAlign: 'center',
  },
  letGo: {
    width: '80%',
  },

})

function UserAvatar({
  setAvatarData, myAvatar, setUserRole, socket, isConnected, users, messages,
}) {
  const [isReady, setIsReady] = useState(false)
  const classes = useStyles()

  const events = {
    connect: 'connect',
    disconnect: 'disconnect',
    updateUsers: 'update-users',
    newMessage: 'new-message',
    registration: 'registration',
  }

  const getUsername = () => {
    const index = users.map((x) => x.id).indexOf(socket.id)
    return users[index].pseudo
  }

  const handleValidation = () => {
    if (!socket) return
    socket.emit(events.registration, {
      id: socket.id,
      pseudo: getUsername(),
      avatar: myAvatar,
    })
    setIsReady(true)
  }
  return (
    <>
      {(isReady) && (
        <UserView
          setUserRole={setUserRole}
          socket={socket}
          isConnected={isConnected}
          users={users}
          messages={messages}
        />
      )}
      <Container className={classes.container} maxWidth="xxl">
        <div className={classes.headerText}>
          <h1>
            Bienvenue
            {' '}
            {getUsername()}
          </h1>
          <p> Configurer votre avatar </p>
        </div>
        <Avatar className={classes.avatar} {...myAvatar} />
        <Container className={classes.subcontainer} maxWidth="lg">
          <Stack direction="row" spacing={2}>
            <AvatarColor myAvatar={myAvatar} setAvatarData={setAvatarData} />
            <AvatarAttribute myAvatar={myAvatar} setAvatarData={setAvatarData} />
          </Stack>
        </Container>
        <Button
          className={classes.letsGo}
          variant="outlined"
          name="click"
          onClick={handleValidation}
        >
          LETS GO
        </Button>
      </Container>
    </>
  )
}
export default UserAvatar
