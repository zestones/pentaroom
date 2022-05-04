import React from 'react'

import clsx from 'clsx'

import Chip from '@mui/material/Chip'
import BrushIcon from '@mui/icons-material/Brush'
import Zoom from '@mui/material/Zoom'
import Box from '@mui/material/Box'

import './Tools.scss'

function Pen({
  userDraw, setUserDraw, setIsInAction, checked, setToolState, toolActive,
}) {
  // active the pen
  const activePen = () => {
    setUserDraw({
      ...userDraw,
      pen: { ...userDraw.pen, isActive: !userDraw.pen.isActive },
      eraser: { ...userDraw.eraser, isActive: false },
      fill: { ...userDraw.fill, isActive: false },
      clear: { ...userDraw.clear, isActive: false },
      undo: { ...userDraw.undo, isActive: false },
      redo: { ...userDraw.redo, isActive: false },
    })
    setIsInAction(false)
    setToolState(!toolActive)
  }

  return (
    <Box className="tool-container">
      <Chip className={clsx('chip', userDraw.pen.isActive && 'active')} color="primary" icon={<BrushIcon />} label="Pinceau" onClick={() => { activePen() }} />

      {userDraw.pen.isActive && (
        <Box className="tools">
          <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
            <Box>
              <input
                type="color"
                value={userDraw.pen.color}
                onChange={(e) => setUserDraw({
                  ...userDraw,
                  pen: { ...userDraw.pen, color: e.target.value },
                })}

              />
              <input
                type="range"
                min="0"
                max="50"
                value={userDraw.pen.width}
                onChange={(e) => setUserDraw({
                  ...userDraw,
                  pen: { ...userDraw.pen, width: e.target.value },
                })}

              />
            </Box>
          </Zoom>
        </Box>
      )}
    </Box>
  )
}

export default Pen
