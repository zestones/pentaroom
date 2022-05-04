/* eslint-disable no-param-reassign */
import React from 'react'

import Zoom from '@mui/material/Zoom'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

// import RedoIcon from '@mui/icons-material/Redo'
// import UndoIcon from '@mui/icons-material/Undo'
import IconButton from '@mui/material/IconButton'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import clsx from 'clsx'

import './Tools.scss'

function Clean({
  userDraw, setIsInAction,
  checked, setToolState, toolActive, clear, userId, setCleanActive, cleanActive,
}) {
  // desactive tools
  const desactiveTool = () => {
    userDraw.pen.isActive = false
    userDraw.fill.isActive = false
    userDraw.eraser.isActive = false
    userDraw.clear.isActive = false
  }

  // active clear tool
  const activeClear = () => {
    desactiveTool()
    userDraw.clear.isActive = true
    clear({ ...userDraw, senderId: userId })
    setIsInAction(false)
  }

  // active clean tool
  const activeClean = () => {
    setCleanActive(!cleanActive)
    setToolState(!toolActive)
    setIsInAction(false)
  }

  return (
    <Box className="tool-container">
      <Chip className={clsx('chip', cleanActive && 'active')} color="primary" icon={<HighlightOffIcon />} label="Nettoyer" onClick={() => { activeClean() }} />

      {cleanActive && (
        <Box>
          <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
            <Box className="tools">
              <IconButton color="primary" aria-label="clear all" label="Effacer tout" onClick={() => { activeClear() }}><HighlightOffIcon /></IconButton>
            </Box>
          </Zoom>
        </Box>
      )}
    </Box>
  )
}
export default Clean
