import React from 'react'
import { createUseStyles } from 'react-jss'
import Button from './Button'
import ToolBoxModal, { openModal } from './ToolBoxModal'

import './Menu.css'

const styles = createUseStyles({
  menuBar: {
    width: '75%',
    height: '5%',
    backgroundColor: 'green',
    border: 'solid 2px',
    marginTop: '1%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: '5px',
    alignItems: 'center',
    margin: '0 auto',
  },
})

function Menu(props) {
  const {
    setLineColor, setLineWidth, lineWidth, setTools, setEraserSize, eraserSize,
  } = props

  return (
    <div className={styles().menuBar}>
      <Button text="Pinceau" setTools={setTools} name="pen" />
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
      <Button text="Gomme" setTools={setTools} name="eraser" />
      <input
        type="range"
        min="10"
        max="100"
        value={eraserSize}
        onChange={(e) => { setEraserSize(e.target.value) }}
      />

      <button type="button" onClick={openModal}>More...</button>
      <ToolBoxModal setTools={setTools} />
    </div>
  )
}
export default Menu
