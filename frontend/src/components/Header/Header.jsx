/* eslint-disable react/jsx-no-undef */
import React from 'react'
import styles from './Header.module.scss'

function Header({ type }) {
  const isInLine = type === 'in-line'

  return (
    <header className={isInLine ? styles.inLine : styles.inColumn}>
      <img src="/pentaboy.svg" alt="pentaboy" className={styles.pentaboy} />
      <h1 className={styles.title}>
        Penta
        {!isInLine && <br />}
        Room
      </h1>
    </header>
  )
}
export default Header
