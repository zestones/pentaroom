import React from 'react'
import Container from '@mui/material/Container'
import clsx from 'clsx'

import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  transparentContainer: {
    borderRadius: '50px',
    padding: '30px',
  },
})

function transparentContainer({ backgroundColor, children, className }) {
  const classes = useStyles()
  return (
    <Container maxWidth="md" style={{ backgroundColor: `${backgroundColor}46` }} className={clsx(className, classes.transparentContainer)}>
      {children}
    </Container>
  )
}
export default transparentContainer
