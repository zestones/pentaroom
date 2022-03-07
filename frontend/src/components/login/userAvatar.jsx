/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import Stack from '@mui/material/Stack'

import Avatar from 'react-nice-avatar'

const useStyles = makeStyles({
  wordsProposition: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectProposition: {
    position: 'absolute',
    right: 35,
    bottom: 35,
  },
})

function UserAvatar({ setAvatarData, myAvatar }) {
  const handleAttribut = () => {
    setAvatarData(() => ({
    }))
  }

  const classes = useStyles()

  return (
    <>
      <Avatar style={{ width: '5rem', height: '5rem' }} {...myAvatar} />
      <Stack className={classes.wordsProposition} direction="row" spacing={2}>
        <Button variant="contained" onClick={handleAttribut}>
          Randomize
        </Button>
      </Stack>
    </>
  )
}
export default UserAvatar
