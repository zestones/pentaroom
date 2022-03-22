import React from 'react'
import Container from '@mui/material/Container'

import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  transparentContainer: {
    minHeight: '500px',
    borderRadius: '50px',
  },
})

function transparentContainer({ backgroundColor }) {
  const classes = useStyles()
  return (
    <Container maxWidth="md" style={{ backgroundColor: `${backgroundColor}46` }} className={classes.transparentContainer} />
  )
}
export default transparentContainer
