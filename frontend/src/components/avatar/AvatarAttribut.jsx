import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'

function AvatarAttribut({ myAvatar, setAvatarData }) {
  const [attribut] = [
    {
      glassesStyle: ['round', 'square', 'none'],
      eyeStyle: ['circle', 'oval', 'smile'],
      mouthStyle: ['laugh', 'smile', 'peace'],
      shirtStyle: ['hoody', 'short', 'polo'],
      hairStyle: ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort'],
    },
  ]

  const [value, setValue] = useState('shirtStyle')
  const [elem, setElem] = useState([])

  const handleRadioChange = (event) => {
    setValue(event.target.value)
  }

  const [indice, setIndice] = useState(0)
  const [hairId, setHairId] = useState(0)

  const setNewChange = (e) => {
    let index = indice
    Object.keys(attribut).forEach((x) => {
      if (e.target.name === x) {
        setIndice(indice + 1)
        if (indice >= attribut[x] - 1) setIndice(0)
        setElem(attribut[x])
        if (Object.prototype.hasOwnProperty.call(attribut, 'hairStyle')) {
          setHairId(hairId + 1)
          if (hairId >= elem.length - 1) { setHairId(0) }
          index = hairId
        }
      }
    })
    setAvatarData((prevData) => ({
      ...prevData,
      [e.target.name]: elem[index],
    }))
    console.log(elem[index])
    console.log(myAvatar)
  }

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Attribut</FormLabel>
      <Button
        variant="contained"
        name={value}
        onClick={setNewChange}
      >
        CHANGER
      </Button>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleRadioChange}
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
