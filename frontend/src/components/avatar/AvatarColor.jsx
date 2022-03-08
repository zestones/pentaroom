import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

function AvatarColor({ myAvatar, setAvatarData }) {
  const [value, setValue] = useState('faceColor')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Couleur</FormLabel>
      <input
        type="color"
        name={value}
        value={myAvatar.value}
        onChange={(e) => setAvatarData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))}
      />
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="faceColor" control={<Radio />} label="Visage" />
        <FormControlLabel value="hairColor" control={<Radio />} label="Cheveux" />
        <FormControlLabel value="shirtColor" control={<Radio />} label="Shirt" />
        <FormControlLabel value="bgColor" control={<Radio />} label="Fond" />
      </RadioGroup>
    </FormControl>
  )
}
export default AvatarColor
