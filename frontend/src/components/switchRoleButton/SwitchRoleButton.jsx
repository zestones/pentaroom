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

function SwitchRoleButton({
  isDrawer, setIsDrawer, sendNewDrawer, sendUserDrawerId,
}) {
  const classes = useStyles()

  const handleClick = () => {
    setIsDrawer(!isDrawer)
    if (isDrawer) sendNewDrawer()
    else sendUserDrawerId()
  }
  return (
    <Button variant="contained" className={classes.button} onClick={handleClick}>{isDrawer ? 'Passer spectateur' : 'Passer dessinateur'}</Button>
  )
}

export default SwitchRoleButton
