import React from 'react'

import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  header: {
    maxHeight: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  pentaboy: {
    height: '300px',
    width: 'auto',
    objectFit: 'contain',
    marginRight: '-75px',
    position: 'relative',
    zIndex: '2',
    transform: 'rotate(-8deg)',
  },
  title: {
    textTransform: 'uppercase',
    '-webkit-text-stroke-width': '2px',
    '-webkit-text-stroke-color': 'black',
    letterSpacing: '2px',
    fontSize: '90px',

  },
})

function Header() {
  const classes = useStyles()
  return (
    <header className={classes.header}>
      <img src="/pentaboy.svg" alt="pentaboy" className={classes.pentaboy} />
      <h1 className={classes.title}>
        Penta
        <br />
        Room
      </h1>
    </header>
  )
}
export default Header
