/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import './AvatarPicker.scss'

import Avatar from 'react-nice-avatar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CaracteristicPicker from './CaracteristicPicker'

import Face from './Face'
import Hair from './Hair'
import Eyes from './Eyes'
import Glasses from './Glasses'
import Shirt from './Shirt'
import Mouth from './Mouth'

const faceColor = ['#f9c9b6', '#e0ac69', '#ac6651', '#8d5524', '#e8beac']
const hairStyles = ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort']
const eyeStyles = ['normal', 'circle', 'oval', 'smile']
const glassesStyles = ['none', 'round', 'square']
const shirtStyles = ['short', 'polo', 'hoody']
const mouthStyles = ['laugh', 'smile', 'peace']
const hairColor = ['#ebfa64', '#260c01', '#160052', '#bdbdbd', '#d17d00', '#3b2301', '#7a0060']

function AvatarPicker({ avatar, setConfig }) {
  const caracteristics = [
    { id: 'face', title: 'Visage' },
    { id: 'hair', title: 'Cheveux' },
    { id: 'eyes', title: 'Yeux' },
    { id: 'glasses', title: 'Lunettes' },
    { id: 'shirt', title: 'T-Shirt' },
    { id: 'mouth', title: 'Bouche' },
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

  const handleShirtClick = () => {
    const index = (shirtStyles.indexOf(avatar.shirtStyle) + 1) % shirtStyles.length
    setConfig({ ...avatar, shirtStyle: shirtStyles[index] })
  }

  const handleMouthClick = () => {
    const index = (mouthStyles.indexOf(avatar.mouthStyle) + 1) % mouthStyles.length
    setConfig({ ...avatar, mouthStyle: mouthStyles[index] })
  }

  const handleRandomClick = () => {
    setConfig({
      ...avatar,
      shirtStyle: shirtStyles[Math.floor(Math.random() * shirtStyles.length)],
      mouthStyle: mouthStyles[Math.floor(Math.random() * mouthStyles.length)],
      glassesStyle: glassesStyles[Math.floor(Math.random() * glassesStyles.length)],
      eyeStyle: eyeStyles[Math.floor(Math.random() * eyeStyles.length)],
      hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
      faceColor: faceColor[Math.floor(Math.random() * faceColor.length)],
      hairColor: hairColor[Math.floor(Math.random() * hairColor.length)],
    })
  }

  return (
    <Container className="container">
      <Box>
        <Avatar className="avatar" {...avatar} />

      </Box>

      {caracteristics.map((carac) => (
        <Box key={carac.id} className="caracteristic-picker">
          <h3 className="caracteristic-title">{carac.title}</h3>
          <CaracteristicPicker>
            {carac.id === 'face' && (<Box onClick={handleFaceClick}><Face faceColor={avatar.faceColor} /></Box>)}
            {carac.id === 'hair' && <Box onClick={handleHairClick}><Hair hairColor={avatar.hairColor} /></Box>}
            {carac.id === 'eyes' && <Box onClick={handleEyesClick}><Eyes /></Box>}
            {carac.id === 'glasses' && <Box onClick={handleGlassesClick}><Glasses /></Box>}
            {carac.id === 'shirt' && <Box onClick={handleShirtClick}><Shirt /></Box>}
            {carac.id === 'mouth' && <Box onClick={handleMouthClick}><Mouth /></Box>}
          </CaracteristicPicker>
        </Box>

      ))}
      <Box>
        <h2> Flemme ? Gagne du temps ! </h2>
        <Button variant="contained" onClick={handleRandomClick}> Générer </Button>
      </Box>
    </Container>
  )
}
export default AvatarPicker
