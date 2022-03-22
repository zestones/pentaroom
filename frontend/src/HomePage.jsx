/* eslint-disable import/no-named-as-default-member */
import React from 'react'
import Header from './components/header/Header'
import TransparentContainer from './components/transparentContainer/TransparentContainer'
import './App.css'

function HomePage() {
  return (
    <>
      <Header />
      <TransparentContainer backgroundColor="#0000A5" />
    </>
  )
}
export default HomePage
