import React from 'react'
import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  headers: {
    backgroundColor: 'yellow',
    width: '100%',
    height: '10%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  score: { border: '2px solid green' },
})

function Header() {
  return (
    <header className={styles().headers}>
      <h1 className={styles().score}>Score</h1>
    </header>
  )
}

export default Header
