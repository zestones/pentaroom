import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  headers: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    '-webkit-text-stroke-width': '1px',
    '-webkit-text-stroke-color': 'black',
    'text-shadow': '2px 2px 0 yellow',
  },
})

function Header() {
  const classes = useStyles()
  return (
    <header className={classes.headers}>
      <h1 className={classes.title}>PENTAROOM</h1>
    </header>
  )
}

export default Header
