/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import Avatar from 'react-nice-avatar'
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
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  avatar: {
    width: '180px',
    height: '180px',
    border: '5px solid black',
    background: '#ffcc00 !important',
  },
  caracteristicPicker: {
    marginLeft: '15px',
    textAlign: 'center',

  },
  caracteristicTitle: {
    fontSize: '20px',
    margin: '10px 0',
  },
})

const faceColor = ['#f9c9b6', '#e0ac69', '#ac6651', '#8d5524']
const hairStyles = ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort']
const eyeStyles = ['normal', 'circle', 'oval', 'smile']
const glassesStyles = ['none', 'round', 'square']

function AvatarPicker({ avatar, setConfig }) {
  const classes = useStyles()

  const caracteristics = [
    { id: 'face', title: 'Visage' },
    { id: 'hair', title: 'Cheveux' },
    { id: 'eyes', title: 'Yeux' },
    { id: 'glasses', title: 'Lunettes' },
  ]

  const handleFaceClick = () => {
    const index = (faceColor.indexOf(avatar.faceColor) + 1) % faceColor.length
    setConfig({ ...avatar, faceColor: faceColor[index] })
  }

  const handleHairClick = () => {
    const index = (hairStyles.indexOf(avatar.hairStyle) + 1) % hairStyles.length
    setConfig({ ...avatar, hairStyle: hairStyles[index] })
  }

  const handleEyesClick = () => {
    const index = (eyeStyles.indexOf(avatar.eyeStyle) + 1) % eyeStyles.length
    setConfig({ ...avatar, eyeStyle: eyeStyles[index] })
  }

  const handleGlassesClick = () => {
    const index = (glassesStyles.indexOf(avatar.glassesStyle) + 1) % glassesStyles.length
    setConfig({ ...avatar, glassesStyle: glassesStyles[index] })
  }

  return (
    <Container className={classes.container}>
      <Box>
        <Avatar className={classes.avatar} {...avatar} />
      </Box>

      {caracteristics.map((carac) => (
        <Box key={carac.id} className={classes.caracteristicPicker}>
          <h3 className={classes.caracteristicTitle}>{carac.title}</h3>
          <CaracteristicPicker>
            {carac.id === 'face' && <Box onClick={handleFaceClick}><Face faceColor={avatar.faceColor} /></Box>}
            {carac.id === 'hair' && <Box onClick={handleHairClick}><Hair hairColor={avatar.hairColor} /></Box>}
            {carac.id === 'eyes' && <Box onClick={handleEyesClick}><Eyes /></Box>}
            {carac.id === 'glasses' && <Box onClick={handleGlassesClick}><Glasses /></Box>}
          </CaracteristicPicker>
        </Box>
      ))}

    </Container>
  )
}
export default AvatarPicker
