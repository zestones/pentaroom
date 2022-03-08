import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'

function AvatarAttribute({ myAvatar, setAvatarData }) {
  // avatar editable value
  const [attribute] = [
    {
      glassesStyle: ['round', 'square', 'none'],
      eyeStyle: ['circle', 'oval', 'smile'],
      mouthStyle: ['laugh', 'smile', 'peace'],
      shirtStyle: ['hoody', 'short', 'polo'],
      hairStyle: ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort'],
    },
  ]

  const [typeAttribute, setType] = useState('shirtStyle')

  // return the index of the value that is currently edited in the avatar
  const getAvatarAttributeIndex = (x) => attribute[x].indexOf(myAvatar[x])

  // Update the targeted value
  const updateAttribute = (e) => {
    let index
    let arrValue = []
    // Iterate the attribute object
    Object.keys(attribute).forEach((x) => {
      // search the targeted element in the object
      if (e.target.name === x) {
        index = getAvatarAttributeIndex(x) + 1

        // Iterate indefinetly over the targeted attribute
        if (index >= attribute[x].length) index = 0

        // set the arr value
        arrValue = attribute[x]
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
        name={typeAttribute}
        onClick={updateAttribute}
      >
        CHANGER
      </Button>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={typeAttribute}
        onChange={(e) => setType(e.target.value)}
      >
        <FormControlLabel value="glassesStyle" control={<Radio />} label="Lunette" />
        <FormControlLabel value="eyeStyle" control={<Radio />} label="Yeux" />
        <FormControlLabel value="mouthStyle" control={<Radio />} label="Bouche" />
        <FormControlLabel value="shirtStyle" control={<Radio />} label="Shirt" />
        <FormControlLabel value="hairStyle" control={<Radio />} label="Cheveux" />
      </RadioGroup>
    </FormControl>
  )
}

export default AvatarAttribute
