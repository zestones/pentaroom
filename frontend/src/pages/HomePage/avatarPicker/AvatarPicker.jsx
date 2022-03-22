/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react'
import Avatar, { genConfig } from 'react-nice-avatar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import CaracteristicPicker from './CaracteristicPicker'

import Face from './Face'
import Hair from './Hair'
import Eyes from './Eyes'
import Glasses from './Glasses'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '350px',
  },
  avatar: {
    width: '250px',
    height: '250px',
    border: '5px solid black',
    background: '#ffcc00 !important',
  },
  caracteristicPicker: {
    marginLeft: '15px',
    textAlign: 'center',

  },
  caracteristicTitle: {
    fontSize: '30px',
    margin: '10px 0',
  },
})

const hairStyles = ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort']
const eyeStyles = ['normal', 'circle', 'oval', 'smile']
const glassesStyles = ['none', 'round', 'square']

function AvatarPicker() {
  const classes = useStyles()

  const [config, setConfig] = useState(genConfig())

  const caracteristics = [
    { id: 'face', title: 'Visage' },
    { id: 'hair', title: 'Cheveux' },
    { id: 'eyes', title: 'Yeux' },
    { id: 'glasses', title: 'Lunettes' },
  ]

  const handleFaceClick = () => {
    const newConfig = genConfig()
    setConfig({ ...config, faceColor: newConfig.faceColor })
  }

  const handleHairClick = () => {
    const index = (hairStyles.indexOf(config.hairStyle) + 1) % hairStyles.length
    const newConfig = genConfig()
    setConfig({ ...config, hairColor: newConfig.hairColor, hairStyle: hairStyles[index] })
  }

  const handleEyesClick = () => {
    const index = (eyeStyles.indexOf(config.eyeStyle) + 1) % eyeStyles.length
    setConfig({ ...config, eyeStyle: eyeStyles[index] })
  }

  const handleGlassesClick = () => {
    const index = (glassesStyles.indexOf(config.glassesStyle) + 1) % glassesStyles.length
    setConfig({ ...config, glassesStyle: glassesStyles[index] })
  }

  return (
    <Container className={classes.container}>
      <Box>
        <Avatar className={classes.avatar} {...config} />
      </Box>

      {caracteristics.map((carac) => (
        <Box key={carac.id} className={classes.caracteristicPicker}>
          <h3 className={classes.caracteristicTitle}>{carac.title}</h3>
          <CaracteristicPicker>
            {carac.id === 'face' && <Box onClick={handleFaceClick}><Face faceColor={config.faceColor} /></Box>}
            {carac.id === 'hair' && <Box onClick={handleHairClick}><Hair hairColor={config.hairColor} /></Box>}
            {carac.id === 'eyes' && <Box onClick={handleEyesClick}><Eyes /></Box>}
            {carac.id === 'glasses' && <Box onClick={handleGlassesClick}><Glasses /></Box>}
          </CaracteristicPicker>
        </Box>
      ))}

    </Container>
  )
}
export default AvatarPicker
