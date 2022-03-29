import React from 'react'
import Button from '@mui/material/Button'
import './PlayButton.scss'

function PlayButton({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" className="playButton">C&lsquo;est Parti !</Button>
  )
}
export default PlayButton
