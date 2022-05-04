import React, { useState } from 'react'

import './Menu.scss'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import Pen from './Tools/Pen'
import Eraser from './Tools/Eraser'
import Clean from './Tools/Clean'

function Menu(props) {
  const {
    userDraw, setUserDraw, setIsInAction, clear, socket,
  } = props

  const [anchorEl, setAnchorEl] = useState(null)
  const [toolActive, setToolState] = useState(true)
  const [cleanActive, setCleanActive] = useState(false)

  // handle popover state
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  // close popover
  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  const checked = userDraw.pen.isActive || userDraw.eraser.isActive
    || userDraw.fill.isActive || cleanActive

  return (
    <Container
      className="menuBar"
      aria-owns={open ? 'tool-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Box className="chipsContainer">
        {(!toolActive || userDraw.pen.isActive) && (
          <Pen
            userDraw={userDraw}
            setUserDraw={setUserDraw}
            setIsInAction={setIsInAction}
            checked={checked}
            setToolState={setToolState}
            toolActive={toolActive}
          />

        )}
        {(!toolActive || userDraw.eraser.isActive) && (
          <Eraser
            userDraw={userDraw}
            setUserDraw={setUserDraw}
            setIsInAction={setIsInAction}
            checked={checked}
            setToolState={setToolState}
            toolActive={toolActive}
          />
        )}
        {(!toolActive || cleanActive) && (
          <Clean
            userDraw={userDraw}
            setIsInAction={setIsInAction}
            checked={checked}
            setToolState={setToolState}
            toolActive={toolActive}
            clear={clear}
            userId={socket.id}
            setCleanActive={setCleanActive}
            cleanActive={cleanActive}
          />
        )}
      </Box>
    </Container>
  )
}
export default Menu
