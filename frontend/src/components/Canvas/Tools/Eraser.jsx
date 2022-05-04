import React from 'react'

import clsx from 'clsx'

import Chip from '@mui/material/Chip'
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal'

import Zoom from '@mui/material/Zoom'
import Box from '@mui/material/Box'

import './Tools.scss'

function Eraser({
  userDraw, setUserDraw, setIsInAction, checked, setToolState, toolActive,
}) {
  // active the eraser tool
  const activeEraser = () => {
    setUserDraw({
      ...userDraw,
      pen: { ...userDraw.pen, isActive: false },
      eraser: { ...userDraw.eraser, isActive: !userDraw.eraser.isActive },
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
      <Chip className={clsx('chip', userDraw.eraser.isActive && 'active')} color="primary" icon={<AutoFixNormalIcon />} label="Gomme" onClick={() => { activeEraser() }} />
      {userDraw.eraser.isActive
          && (
            <Box className="tools">
              <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
                <Box>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={userDraw.eraser.width}
                    onChange={(e) => setUserDraw({
                      ...userDraw,
                      eraser: { ...userDraw.eraser, width: e.target.value },
                    })}
                  />
                </Box>
              </Zoom>
            </Box>
          )}
    </Box>
  )
}

export default Eraser
