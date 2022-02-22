import React from 'react'

function PenOption(props) {
  const {
    setLineColor, setLineWidth, lineWidth, state,
  } = props

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!state) return (<></>)
  return (
    <>
      <input
        type="color"
        onChange={(e) => { setLineColor(e.target.value) }}
      />
      <input
        type="range"
        min="0"
        max="50"
        value={lineWidth}
        onChange={(e) => { setLineWidth(e.target.value) }}
      />
    </>
  )
}

export default PenOption
