import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'

function AvatarAttribut({ myAvatar, setAvatarData }) {
  // avatar editable value
  const [attribut] = [
    {
      glassesStyle: ['round', 'square', 'none'],
      eyeStyle: ['circle', 'oval', 'smile'],
      mouthStyle: ['laugh', 'smile', 'peace'],
      shirtStyle: ['hoody', 'short', 'polo'],
      hairStyle: ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort'],
    },
  ]

  // init variable
  const [typeAttribut, setType] = useState('shirtStyle')
  const [arrValue, setArrValue] = useState(attribut.shirtStyle)

  // return the index of the value that is currently edited in the avatar
  const getAvatarAttributeIndex = (x) => attribut[x].indexOf(myAvatar[x])

  // Update the targeted value
  const updateAttribut = (e) => {
    let index
    // Iterate the attribut object
    Object.keys(attribut).forEach((x) => {
      // search the targeted element in the object
      if (e.target.name === x) {
        index = getAvatarAttributeIndex(x) + 1

        // Iterate indefinetly
        if (index >= attribut[x].length - 1) index = 0

        // set the arr value
        setArrValue(attribut[x])
      }
    })

    // Change the avatar data
    setAvatarData((prevData) => ({
      ...prevData,
      [e.target.name]: arrValue[index],
    }))
  }

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Attribut</FormLabel>
      <Button
        variant="contained"
        name={typeAttribut}
        onClick={updateAttribut}
      >
        CHANGER
      </Button>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={typeAttribut}
        onChange={(e) => setType(e.target.value)}
      >
        <FormControlLabel value="glassesStyle" control={<Radio />} label="Glasses" />
        <FormControlLabel value="eyeStyle" control={<Radio />} label="Eyes" />
        <FormControlLabel value="mouthStyle" control={<Radio />} label="Mouth" />
        <FormControlLabel value="shirtStyle" control={<Radio />} label="Shirt" />
        <FormControlLabel value="hairStyle" control={<Radio />} label="Hair Style" />
      </RadioGroup>
    </FormControl>
  )
}

export default AvatarAttribut
