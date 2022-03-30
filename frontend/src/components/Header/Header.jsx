/* eslint-disable react/jsx-no-undef */
import React from 'react'
import './Header.scss'

function Header() {
  return (
    <header className="header">
      <img src="/pentaboy.svg" alt="pentaboy" className="pentaboy" />
      <h1 className="title">
        Penta
        <br />
        Room
      </h1>
    </header>
  )
}
export default Header
