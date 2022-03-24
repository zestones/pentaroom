import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  headers: {
    display: 'flex',
    justifyContent: 'center',
  },
})

function Header() {
  const classes = useStyles()
  return (
    <header className={classes.headers}>
      <h1>PENTAROOM</h1>
    </header>
  )
}

export default Header
