/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import Stack from '@mui/material/Stack'

import NiceAvatar, { genConfig } from 'react-nice-avatar'

/** Canvas Styles */
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

function UserAvatar() {
  const [config, setConfig] = useState({})
  const myConfig = genConfig(config)

  const handleAttribut = () => {
    setConfig(() => ({}))
  }

  const classes = useStyles()

  return (
    <>
      <NiceAvatar style={{ width: '5rem', height: '5rem' }} {...myConfig} />
      <Stack className={classes.wordsProposition} direction="row" spacing={2}>
        <Button variant="contained" onClick={handleAttribut}>
          Randomize
        </Button>
      </Stack>
    </>
  )
}
export default UserAvatar
