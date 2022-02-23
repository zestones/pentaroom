import React from 'react'

function EraserOption(props) {
  const { setEraserSize, eraserSize, state } = props
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!state) return (<></>)
  return (
    <input
      type="range"
      min="10"
      max="100"
      value={eraserSize}
      onChange={(e) => { setEraserSize(e.target.value) }}
    />
  )
}

export default EraserOption
