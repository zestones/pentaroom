/* eslint-disable react/jsx-no-undef */
import React from 'react'
import './Header.scss'

function Header({ styles }) {
  const isInLine = styles === 'in-line'

  return (
    <header className={isInLine ? 'header-in-line' : 'header-in-column'}>
      <img src="/pentaboy.svg" alt="pentaboy" className={isInLine ? 'pentaboy-in-line' : 'pentaboy-in-column'} />
      <h1 className={isInLine ? 'title-in-line' : 'title-in-column'}>
        Penta
        {!isInLine && <br />}
        Room
      </h1>
    </header>
  )
}
export default Header
