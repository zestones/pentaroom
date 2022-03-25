import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  headers: {
    display: 'flex',
    justifyContent: 'center',
  },

  header: {
    maxHeight: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  pentaboy: {
    height: '70px',
    width: 'auto',
    objectFit: 'contain',
    marginRight: '-20px',
    position: 'relative',
    zIndex: '2',
    transform: 'rotate(-8deg)',
  },
  title: {
    '-webkit-text-stroke-width': '1.5px',
    '-webkit-text-stroke-color': 'black',

    fontSize: '40px',
    margin: '0',

  },
})

function Header() {
  const classes = useStyles()
  return (
    <header className={classes.header}>
      <img src="/pentaboy.svg" alt="pentaboy" className={classes.pentaboy} />
      <h1 className={classes.title}>
        PentaRoom
      </h1>
    </header>
  )
}

export default Header
