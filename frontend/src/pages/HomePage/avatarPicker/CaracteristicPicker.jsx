import React from 'react'

import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'

const useStyles = makeStyles({
  caracteristicPicker: {
    width: '120px',
    height: '120px',
    borderRadius: '100%',
    backgroundColor: '#ffcc00',
    padding: '20px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

function CaracteristicPicker({ children }) {
  const classes = useStyles()

  return (
    <Box className={classes.caracteristicPicker}>
      {children}
    </Box>
  )
}
export default CaracteristicPicker
