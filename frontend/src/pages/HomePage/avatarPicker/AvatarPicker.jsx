/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
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

function AvatarPicker() {
  const classes = useStyles()

  const config = genConfig()

  const caracteristics = [
    { id: 'face', title: 'Visage' },
    { id: 'hair', title: 'Cheveux' },
    { id: 'eyes', title: 'Yeux' },
    { id: 'glasses', title: 'Lunettes' },
  ]

  return (
    <Container className={classes.container}>
      <Box>
        <Avatar className={classes.avatar} {...config} />
      </Box>

      {caracteristics.map((carac) => (
        <Box key={carac.id} className={classes.caracteristicPicker}>
          <h3 className={classes.caracteristicTitle}>{carac.title}</h3>
          <CaracteristicPicker>
            {carac.id === 'face' && <Face faceColor={config.faceColor} />}
            {carac.id === 'hair' && <Hair hairColor={config.hairColor} />}
            {carac.id === 'eyes' && <Eyes />}
            {carac.id === 'glasses' && <Glasses />}
          </CaracteristicPicker>
        </Box>
      ))}

    </Container>
  )
}
export default AvatarPicker
