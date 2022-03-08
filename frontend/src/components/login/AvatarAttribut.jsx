import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'

function AvatarAttribut({ setAvatarData }) {
  const [value, setValue] = useState('shirtStyle')

  const [elem, setElem] = useState([])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const [attribut] = [
    {
      glassesStyle: ['round', 'square', 'none'],
      eyeStyle: ['circle', 'oval', 'smile'],
      noseStyle: ['short', 'long', 'round'],
      mouthStyle: ['laugh', 'smile', 'peace'],
      shirtStyle: ['hoody', 'short', 'polo'],
      hairStyle: ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort'],
    },
  ]
  const [indice, setIndice] = useState(0)
  const [hairId, setHairId] = useState(0)
  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Attribut</FormLabel>
      <Button
        variant="contained"
        name={value}
        onClick={(e) => {
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
        }}
      >
        CHANGER
      </Button>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="glassesStyle" control={<Radio />} label="Glasses" />
        <FormControlLabel value="eyeStyle" control={<Radio />} label="Eyes" />
        <FormControlLabel value="noseStyle" control={<Radio />} label="Nose" />
        <FormControlLabel value="mouthStyle" control={<Radio />} label="Mouth" />
        <FormControlLabel value="shirtStyle" control={<Radio />} label="Shirt" />
        <FormControlLabel value="hairStyle" control={<Radio />} label="Hair Style" />
      </RadioGroup>
    </FormControl>
  )
}

export default AvatarAttribut
