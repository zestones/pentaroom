import React, { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
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

  // Get the modal
  let modal = document.getElementById('toolBox')
  useEffect(() => {
    modal = document.getElementById('toolBox')
  })

  // Open the modal
  const openModal = () => { modal.style.display = 'block' }

  // Close the modal
  const closeModal = () => { modal.style.display = 'none' }

  // Close the modal when the users clicks outside the component
  useEffect(() => {
    function handleClickOutsideModal(e) {
      if (e.target === modal) closeModal()
    }
    document.addEventListener('mousedown', handleClickOutsideModal)
  }, [modal])

  const clearCanvas = () => {
    setTools({
      pen: false,
      eraser: false,
      clearAll: true,
      rectangle: false,
    })
    closeModal()
  }
  const setDrawRect = () => {
    setTools((prevToolBox) => ({
      ...prevToolBox,
      pen: false,
      eraser: false,
      clearAll: false,
      rectangle: true,
    }))
    closeModal()
  }

  return (
    <div className={styles().menuBar}>
      <button
        onClick={() => {
          setTools({
            pen: true,
            eraser: false,
            clearAll: false,
            rectangle: false,
          })
        }}
        type="button"
      >
        Pen
      </button>
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
      <button
        onClick={() => {
          setTools({
            pen: false,
            eraser: true,
            clearAll: false,
            rectangle: false,
          })
        }}
        type="button"
      >
        Eraser

      </button>
      <input
        type="range"
        min="10"
        max="100"
        value={eraserSize}
        onChange={(e) => { setEraserSize(e.target.value) }}
      />

      <button type="button" onClick={openModal}>More...</button>

      <div id="toolBox" className="modal">
        <div className="toolBoxContent">
          <div className="toolBoxHeader">
            <span role="button" tabIndex={0} className="close" onClick={closeModal} onKeyDown={closeModal}>&times;</span>
            <h2>Modal Header</h2>
          </div>
          <div className="toolBoxBody">
            <div className={styles().tools}>
              <button
                onClick={setDrawRect}
                type="button"
              >
                Rectangle
              </button>
              <button
                onClick={clearCanvas}
                type="button"
              >
                Clear Canvas
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
export default Menu
