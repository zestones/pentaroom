import React from 'react'
// eslint-disable-next-line import/no-cycle
import { closeModal } from './ToolBoxModal'
// eslint-enable-next-line import/no-cycle

function Button(props) {
  const {
    text, setTools, name,
  } = props

  // Update active tool
  const updateTools = (e) => {
    // Set every tool to false
    setTools((prevTools) => ({
      ...prevTools,
      pen: false,
      eraser: false,
      clearAll: false,
      rectangle: false,
      circle: false,
    }))

    // Then activate the wanted tool
    setTools({ [e.target.name]: true })
    closeModal()

    if (e.target.name !== 'clearAll' && e.target.name !== 'rectangle' && e.target.name !== 'circle') {
      setTools((prevTools) => ({
        ...prevTools,
        visible: true,
      }))
    }
  }

  return (
    <button
      type="button"
      name={name}
      onClick={updateTools}
    >
      {text}
    </button>
  )
}

export default Button
