import React from 'react'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  button: {
    position: 'absolute',
    bottom: '30px',
    left: '30px',
  },
})

function SwitchRoleButton({ isChallenged, setIsChallenged, setWords }) {
  const classes = useStyles()

  const handleClick = () => {
    setIsChallenged(!isChallenged)
    setWords(['mot 1', 'mot 2', 'mot 3'])
  }
  return (
    <Button variant="contained" className={classes.button} onClick={handleClick}>{isChallenged ? 'Passer spectateur' : 'Passer dessinateur'}</Button>
  )
}

export default SwitchRoleButton
