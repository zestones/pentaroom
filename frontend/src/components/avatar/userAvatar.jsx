/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { makeStyles } from '@mui/styles'

import Avatar from 'react-nice-avatar'
import { Stack } from '@mui/material'
import AvatarColor from './AvatarColor'
import AvatarAttribut from './AvatarAttribut'

const useStyles = makeStyles({
  inputColor: {
    display: 'flex',
    flexDirection: 'column',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
  },

})

function UserAvatar({ setAvatarData, myAvatar }) {
  const classes = useStyles()
  return (
    <>
      <Avatar style={{ width: '5rem', height: '5rem' }} {...myAvatar} />
      <Stack className={classes.wordsProposition} direction="row" spacing={2}>
        <AvatarColor myAvatar={myAvatar} setAvatarData={setAvatarData} />
        <AvatarAttribut myAvatar={myAvatar} setAvatarData={setAvatarData} />
      </Stack>
    </>
  )
}
export default UserAvatar
