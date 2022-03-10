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

function SwitchRoleButton({ isDrawer, setIsDrawer }) {
  const classes = useStyles()

  const handleClick = () => {
    setIsDrawer(!isDrawer)
  }
  return (

    <>
      <Button variant="contained" className={classes.button} onClick={handleClick}>{isDrawer ? 'Passer spectateur' : 'Passer dessinateur'}</Button>
      <Button variant="contained" size="big">resultat</Button>
    </>
  )
}

export default SwitchRoleButton
