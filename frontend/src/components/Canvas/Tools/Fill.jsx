import React from 'react'

import clsx from 'clsx'

import Chip from '@mui/material/Chip'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import Zoom from '@mui/material/Zoom'
import Box from '@mui/material/Box'

import './Tools.scss'

function Fill({
  userDraw, setUserDraw, setIsInAction, checked, setToolState, toolActive,
}) {
  const activeFill = () => {
    setUserDraw({
      ...userDraw,
      pen: { ...userDraw.pen, isActive: false },
      eraser: { ...userDraw.eraser, isActive: false },
      fill: { ...userDraw.fill, isActive: !userDraw.fill.isActive },
      clear: { ...userDraw.clear, isActive: false },
      undo: { ...userDraw.undo, isActive: false },
      redo: { ...userDraw.redo, isActive: false },
    })
    setIsInAction(false)
    setToolState(!toolActive)
  }
  return (
    <Box className="tool-container">
      <Chip className={clsx('chip', userDraw.fill.isActive && 'active')} color="primary" icon={<FormatColorFillIcon />} label="Remplissage" onClick={() => { activeFill() }} />
      {userDraw.fill.isActive && (
        <Box className="tools">
          <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
            <Box>

              <input
                type="color"
                value={userDraw.fill.color}
                onChange={(e) => setUserDraw({
                  ...userDraw,
                  fill: { ...userDraw.fill, color: e.target.value },
                })}
              />
            </Box>
          </Zoom>
        </Box>
      )}
    </Box>
  )
}

export default Fill
