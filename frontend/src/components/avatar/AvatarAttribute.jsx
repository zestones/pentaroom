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
      hatStyle: ['none', 'turban', 'beanie'],
      faceColor: ['#E8BEAC', '#8d5524', '#e0ac69'],
      hairColor: ['#e2bc74', '#e7a854', '#7e5835', '#85530f', '#6b5a3a'],
      shirtColor: ['blue', 'yellow', 'red', 'purple'],
      hatColor: ['red', 'blue'],
      bgColor: ['linear-gradient(#e66465, #9198e5)',
        'linear-gradient(45deg, blue, red)',
        'linear-gradient(150deg, #805381, #c0c0a4)',
        'linear-gradient(229deg, #7b3da9, #89ee8d)',
        'linear-gradient(215deg, #784030, #2a5c1c)',
        'linear-gradient(237deg, #882d64, #b4db90)'],
    },
  ]

  const [typeAttribute, setType] = useState('glassesStyle')

  // return the index of the value that is currently edited in the avatar
  const getAvatarAttributeIndex = (x) => attribute[x].indexOf(myAvatar[x])

  // Update the targeted value
  const updateAttribute = (e) => {
    // Get the type of attribute
    const type = Object.keys(attribute).find((x) => x === e.target.name)
    let index = getAvatarAttributeIndex(type) + 1

    // Iterate indefinetly over the targeted attribute
    if (index >= attribute[type].length) index = 0

    // set the arr value
    const arrValue = attribute[type]

    // Change the avatar data
    setAvatarData((prevData) => ({
      ...prevData,
      [e.target.name]: arrValue[index],
    }))
  }

  const randomizeAvatar = () => {
    Object.keys(attribute).forEach((x) => {
      const arr = attribute[x]
      const random = Math.floor(Math.random() * arr.length)
      const randomValue = arr[random]

      setAvatarData((prevData) => ({
        ...prevData,
        [x]: randomValue,
      }))
    })
  }

  return (
    <>
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
          <FormControlLabel value="hatStyle" control={<Radio />} label="Chapeau" />
        </RadioGroup>
      </FormControl>

      <Button
        variant="outlined"
        name="click"
        onClick={randomizeAvatar}
      >
        Générer
      </Button>
    </>
  )
}

export default AvatarAttribute
