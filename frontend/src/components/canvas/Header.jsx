import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  headers: {
    width: '100%',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
})

function Header() {
  const classes = useStyles()
  return (
    <header className={classes.headers}>
      <h1 className={classes.score}>Score</h1>
    </header>
  )
}

export default Header
