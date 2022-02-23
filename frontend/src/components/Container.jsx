import React from 'react'
import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  container: {
    backgroundColor: 'grey',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

function Container(props) {
  const { children } = props
  return (
    <div className={styles().container}>
      {children}
    </div>
  )
}
export default Container
