import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

function AvatarColor({ setAvatarData }) {
  const [value, setValue] = useState('faceColor')

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Couleur</FormLabel>
      <input
        type="color"
        onChange={(e) => setAvatarData((prevData) => ({
          ...prevData,
          [value]: e.target.value, /* hairColor */
        }))}
      />
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={(e) => { setValue(e.target.value) }}
      >
        <FormControlLabel value="faceColor" control={<Radio />} label="Visage" />
        <FormControlLabel value="hairColor" control={<Radio />} label="Cheveux" />
        <FormControlLabel value="shirtColor" control={<Radio />} label="Shirt" />
        <FormControlLabel value="bgColor" control={<Radio />} label="Fond" />
        <FormControlLabel value="hatColor" control={<Radio />} label="Chapeau" />
      </RadioGroup>
    </FormControl>
  )
}
export default AvatarColor
