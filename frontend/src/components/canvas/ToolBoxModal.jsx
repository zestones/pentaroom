import React, { useEffect } from 'react'
// eslint-disable-next-line import/no-cycle
import Button from './Button'
// eslint-enable-next-line import/no-cycle

// Get the modal
let modal = document.getElementById('toolBox')

// Open the modal
function openModal() { modal.style.display = 'block' }

// Close the modal
function closeModal() { modal.style.display = 'none' }

function ToolBoxModal(props) {
  const { setTools } = props

  // init modal
  useEffect(() => {
    modal = document.getElementById('toolBox')
  })

  // Close the modal when the users clicks outside the component
  useEffect(() => {
    function handleClickOutsideModal(e) {
      if (e.target === modal) closeModal()
    }
    document.addEventListener('mousedown', handleClickOutsideModal)
  }, [modal])

  return (
    <div id="toolBox" className="modal">
      <div className="toolBoxContent">
        <div className="toolBoxHeader">
          <span role="button" tabIndex={0} className="close" onClick={closeModal} onKeyDown={closeModal}>&times;</span>
          <h2>Modal Header</h2>
        </div>
        <div className="toolBoxBody">
          <div className="">
            <Button text="Rectangle" setTools={setTools} name="rectangle" />
            <Button text="Clear Canvas" setTools={setTools} name="clearAll" />
            <Button text="circle" setTools={setTools} name="circle" />
          </div>
        </div>
      </div>
    </div>
  )
}

export { openModal, closeModal }
export default ToolBoxModal
