import React from 'react'
import './App.css'

function App() {
  return (
    <p>
      {process.env.REACT_APP_ENDPOINT}
      {' '}
      - Test
    </p>
  )
}

export default App
