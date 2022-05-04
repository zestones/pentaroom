/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react'

import Avatar from 'react-nice-avatar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import clsx from 'clsx'
import styles from './AvatarPicker.module.scss'
import CaracteristicPicker from './CaracteristicPicker'

import Option from './Option'
import Face from './Caracteristic/Face'
import Hair from './Caracteristic/Hair'
import Eyes from './Caracteristic/Eyes'
import Glasses from './Caracteristic/Glasses'
import Shirt from './Caracteristic/Shirt'
import Mouth from './Caracteristic/Mouth'
import Hat from './Caracteristic/Hat'
import Random from './Caracteristic/Random'

const faceColor = ['#f9c9b6', '#e0ac69', '#ac6651', '#8d5524', '#e8beac']
const hairStyles = ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort']
const eyeStyles = ['normal', 'circle', 'oval', 'smile']
const glassesStyles = ['none', 'round', 'square']
const shirtStyles = ['short', 'polo', 'hoody']
const mouthStyles = ['laugh', 'smile', 'peace']
const hatStyles = ['none', 'turban', 'beanie']
const hairColor = ['#ebfa64', '#260c01', '#160052', '#bdbdbd', '#d17d00', '#3b2301', '#7a0060']
const hatColor = ['blue', 'red', 'green', 'yellow', 'orange', 'violet', 'pink', 'gray']
const shirtColor = hatColor
const bgColor = [
  'linear-gradient(#e66465, #9198e5)',
  'linear-gradient(45deg, blue, red)',
  'linear-gradient(150deg, #805381, #c0c0a4)',
  'linear-gradient(229deg, #7b3da9, #89ee8d)',
  'linear-gradient(215deg, #784030, #2a5c1c)',
  'linear-gradient(237deg, #882d64, #b4db90)',
]

function AvatarPicker({ avatar, setConfig }) {
  const caracteristics = [
    { id: 'random', title: 'Aléatoire' },
    { id: 'face', title: 'Visage' },
    { id: 'hair', title: 'Cheveux' },
    { id: 'eyes', title: 'Yeux' },
    { id: 'glasses', title: 'Lunettes' },
    { id: 'shirt', title: 'T-Shirt' },
    { id: 'mouth', title: 'Bouche' },
    { id: 'hat', title: 'Chapeau' },
    { id: 'background', title: 'Fond' },
  ]

  const [open, setOpen] = useState({})

  /**
   * handle the box state open/closed
   * @param {*} id
   */
  const handleBoxState = (id) => {
    if (open.type === id) setOpen({})
    else setOpen({ type: id })
  }

  // handle the click on the face icon
  const handleFaceClick = () => {
    const index = (faceColor.indexOf(avatar.faceColor) + 1) % faceColor.length
    setConfig({ ...avatar, faceColor: faceColor[index] })
    if (open.type) handleBoxState()
  }

  // handle the click on the hair icon
  const handleHairClick = () => {
    const index = (hairStyles.indexOf(avatar.hairStyle) + 1) % hairStyles.length
    setConfig({ ...avatar, hairStyle: hairStyles[index] })
  }

  // handle the click on the hat icon
  const handleHatClick = () => {
    const index = (hatStyles.indexOf(avatar.hatStyle) + 1) % hatStyles.length
    setConfig({ ...avatar, hatStyle: hatStyles[index] })
  }

  // handle the click on the eyes icon
  const handleEyesClick = () => {
    const index = (eyeStyles.indexOf(avatar.eyeStyle) + 1) % eyeStyles.length
    setConfig({ ...avatar, eyeStyle: eyeStyles[index] })
    if (open.type) handleBoxState()
  }

  // handle the click on the glass icon
  const handleGlassesClick = () => {
    const index = (glassesStyles.indexOf(avatar.glassesStyle) + 1) % glassesStyles.length
    setConfig({ ...avatar, glassesStyle: glassesStyles[index] })
    if (open.type) handleBoxState()
  }

  // handle the click on the shirt icon
  const handleShirtClick = () => {
    const index = (shirtStyles.indexOf(avatar.shirtStyle) + 1) % shirtStyles.length
    setConfig({ ...avatar, shirtStyle: shirtStyles[index] })
  }

  // handle the click on the mouth icon
  const handleMouthClick = () => {
    const index = (mouthStyles.indexOf(avatar.mouthStyle) + 1) % mouthStyles.length
    setConfig({ ...avatar, mouthStyle: mouthStyles[index] })
    if (open.type) handleBoxState()
  }

  // handle the click on the background color icon
  const handlebgColorClick = () => {
    const index = (bgColor.indexOf(avatar.bgColor) + 1) % bgColor.length
    setConfig({ ...avatar, bgColor: bgColor[index] })
    if (open.type) handleBoxState()
  }

  // handle the click on the random icon
  const handleRandomClick = () => {
    setConfig({
      ...avatar,
      shirtStyle: shirtStyles[Math.floor(Math.random() * shirtStyles.length)],
      shirtColor: shirtColor[Math.floor(Math.random() * shirtColor.length)],
      mouthStyle: mouthStyles[Math.floor(Math.random() * mouthStyles.length)],
      glassesStyle: glassesStyles[Math.floor(Math.random() * glassesStyles.length)],
      eyeStyle: eyeStyles[Math.floor(Math.random() * eyeStyles.length)],
      hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
      faceColor: faceColor[Math.floor(Math.random() * faceColor.length)],
      hairColor: hairColor[Math.floor(Math.random() * hairColor.length)],
      hatStyle: hatStyles[Math.floor(Math.random() * hatStyles.length)],
      hatColor: hatColor[Math.floor(Math.random() * hatColor.length)],
      bgColor: bgColor[Math.floor(Math.random() * bgColor.length)],
    })
    if (open.type) handleBoxState()
  }

  return (
    <Container className={styles.container}>
      <Box className={styles.avatarContainer}>
        <Avatar className={styles.avatar} {...avatar} />
      </Box>

      {caracteristics.map((carac) => (
        <Box key={carac.id} className={styles.caracteristicPicker}>
          <h3 className={styles.caracteristicTitle}>{carac.title}</h3>
          <CaracteristicPicker>
            {carac.id === 'face' && (
              <Box className={clsx(styles.caracteristicPickerBox, open.type === carac.id ? styles.active : '')} onClick={handleFaceClick}>
                <Face faceColor={avatar.faceColor} />
              </Box>
            )}

            {carac.id === 'hair' && (
              <>
                <Box
                  className={clsx(styles.caracteristicPickerBox, open.type === carac.id ? styles.active : '')}
                  onClick={() => handleBoxState(carac.id)}
                >
                  <Hair hairColor={avatar.hairColor} />
                </Box>
                {(open.type === carac.id) && (
                  <Option
                    handleClick={handleHairClick}
                    setConfig={setConfig}
                    id="hairColor"
                  >
                    <Hair hairColor={avatar.hairColor} />
                  </Option>
                )}
              </>
            )}

            {carac.id === 'hat' && (
              <>
                <Box
                  className={clsx(styles.caracteristicPickerBox, open.type === carac.id ? styles.active : '')}
                  onClick={() => handleBoxState(carac.id)}
                >
                  <Hat hatColor={avatar.hatColor} />
                </Box>
                {
                  (open.type === carac.id) && (
                    <Option
                      handleClick={handleHatClick}
                      setConfig={setConfig}
                      id="hatColor"
                    >
                      <Hat hatColor={avatar.hatColor} />
                    </Option>
                  )
                }
              </>
            )}

            {carac.id === 'shirt' && (
              <>
                <Box
                  className={clsx(styles.caracteristicPickerBox, open.type === carac.id ? styles.active : '')}
                  onClick={() => handleBoxState(carac.id)}
                >
                  <Shirt shirtColor={avatar.shirtColor} />
                </Box>
                {
                  (open.type === carac.id) && (
                    <Option
                      handleClick={handleShirtClick}
                      setConfig={setConfig}
                      id="shirtColor"
                    >
                      <Shirt shirtColor={avatar.shirtColor} />
                    </Option>
                  )
                }
              </>
            )}

            {carac.id === 'eyes' && (
              <Box className={clsx(styles.caracteristicPickerBox, open.type === carac.id ? styles.active : '')} onClick={handleEyesClick}>
                <Eyes />
              </Box>
            )}

            {carac.id === 'glasses' && (
              <Box className={clsx(styles.caracteristicPickerBox, open.type === carac.id ? styles.active : '')} onClick={handleGlassesClick}>
                <Glasses />
              </Box>
            )}
            {carac.id === 'mouth' && (
              <Box className={clsx(styles.caracteristicPickerBox, open.type === carac.id ? styles.active : '')} onClick={handleMouthClick}>
                <Mouth />
              </Box>
            )}

            {carac.id === 'background' && (
              <Box
                className={clsx(styles.caracteristicPickerBox, open.type === carac.id ? styles.active : '')}
                style={{
                  background: avatar.bgColor,
                }}
                onClick={handlebgColorClick}
              />
            )}

            {carac.id === 'random' && (
              <Box className={clsx(styles.caracteristicPickerBox, open.type === carac.id ? styles.active : '')} onClick={handleRandomClick}>
                <Random />
              </Box>
            )}
          </CaracteristicPicker>
        </Box>

      ))}
    </Container>
  )
}
export default AvatarPicker
