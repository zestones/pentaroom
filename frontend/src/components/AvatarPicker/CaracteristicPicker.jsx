import React from 'react'

import Box from '@mui/material/Box'
import './CaracteristicPicker.scss'

function CaracteristicPicker({ children }) {
  return (
    <Box className="caracteristicPicker">
      {children}
    </Box>
  )
}
export default CaracteristicPicker
