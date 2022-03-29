import React from 'react'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  playButton: {
    margin: '0 auto',
    display: 'block',
    fontSize: '35px',
    lineHeight: '1',
    padding: '20px 40px',
    borderRadius: '50px',
    backgroundColor: '#f58322',
    fontFamily: 'inherit',
  },
})

function PlayButton({ onClick }) {
  const classes = useStyles()
  return (
    <Button onClick={onClick} variant="contained" className={classes.playButton}>C&lsquo;est Parti !</Button>
  )
}
export default PlayButton
