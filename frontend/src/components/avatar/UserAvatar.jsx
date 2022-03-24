/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'

import Button from '@mui/material/Button'
import Avatar, { genConfig } from 'react-nice-avatar'
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
  setUserRole, socket, isConnected, users, messages, hiddenWord, userDrawer,
}) {
  const [config, setAvatarData] = useState({
    sex: 'woman',
    faceColor: 'white',
    earSize: 'small',
    eyeStyle: 'smile',
    noseStyle: 'short',
    mouthStyle: 'peace',
    shirtStyle: 'polo',
    glassesStyle: 'round',
    hairColor: '#000',
    hairStyle: 'womanShort',
    hatStyle: 'none',
    hatColor: '#000',
    eyeBrowStyle: 'up',
    shirtColor: '#F4D150',
    bgColor: 'linear-gradient(45deg, #176fff 0%, #68ffef 100%)',
  })

  const myAvatar = genConfig(config)

  const [isReady, setIsReady] = useState(false)
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
      {(isReady) ? (
        <UserView
          setUserRole={setUserRole}
          socket={socket}
          isConnected={isConnected}
          users={users}
          messages={messages}
          hiddenWord={hiddenWord}
          userDrawer={userDrawer}
        />
      )
        : (
          <>
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
                <AvatarColor setAvatarData={setAvatarData} />
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
          </>
        )}
    </>
  )
}
export default UserAvatar
