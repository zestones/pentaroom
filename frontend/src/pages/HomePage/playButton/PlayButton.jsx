import React from 'react'
import Button from '@mui/material/Button'

import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  playButton: {
    margin: 'auto',
    display: 'block',
    fontSize: '45px',
    lineHeight: '1',
    padding: '30px 60px',
    borderRadius: '50px',
    backgroundColor: '#f58322',
    fontFamily: 'inherit',
  },
})

function PlayButton() {
  const classes = useStyles()
  return (
    <Button variant="contained" className={classes.playButton}>C&lsquo;est Parti !</Button>
  )
}
export default PlayButton
