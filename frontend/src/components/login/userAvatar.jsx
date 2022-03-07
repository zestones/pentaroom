/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import Stack from '@mui/material/Stack'

import NiceAvatar, { genConfig } from 'react-nice-avatar'

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
  const [config, setConfig] = useState({
    sex: 'man',
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
  const myConfig = genConfig(config)

  const handleAttribut = () => {
    setConfig(() => ({
    }))
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
