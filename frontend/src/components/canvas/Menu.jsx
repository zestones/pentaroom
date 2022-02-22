import React, { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import Button from './Button'
import ToolBoxModal, { openModal } from './ToolBoxModal'
import PenOption from './Tools/PenOption'
import EraserOption from './Tools/EraserOption'
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
    setLineColor, setLineWidth, lineWidth, setTools, setEraserSize, eraserSize, tools,
  } = props

  // Get the canvas
  let canvas = document.getElementById('myCanvas')

  // init the canvas
  useEffect(() => {
    canvas = document.getElementById('myCanvas')
  })

  // Close the pen Option when the canvas is clicked
  useEffect(() => {
    function handleClickOutsideToolBoxMenu(e) {
      if (e.target === canvas) {
        setTools((prevTools) => ({
          ...prevTools,
          visible: false,
        }))
      }
    }
    document.addEventListener('pointerdown', handleClickOutsideToolBoxMenu)
  }, [canvas])

  return (
    <div id="toolBar" className={styles().menuBar}>
      {
        (tools.visible)
          ? (
            <>
              <PenOption
                setLineColor={setLineColor}
                setLineWidth={setLineWidth}
                lineWidth={lineWidth}
                state={tools.pen}
              />
              <EraserOption
                setEraserSize={setEraserSize}
                eraserSize={eraserSize}
                state={tools.eraser}
              />
            </>
          )
          : (
            <>
              <Button text="Pinceau" setTools={setTools} name="pen" />
              <Button text="Gomme" setTools={setTools} name="eraser" />
            </>
          )
      }
      <button type="button" onClick={openModal}>More...</button>
      <ToolBoxModal setTools={setTools} />
    </div>
  )
}
export default Menu
