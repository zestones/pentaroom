import React from 'react'
import Container from '@mui/material/Container'
import clsx from 'clsx'

import styles from './TransparentContainer.module.scss'

function transparentContainer({ backgroundColor, children, className }) {
  return (
    <Container style={{ backgroundColor: `${backgroundColor}46` }} className={clsx(className, styles.transparentContainer)}>
      {children}
    </Container>
  )
}
export default transparentContainer
