import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import BrushIcon from '@mui/icons-material/Brush'
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Chip from '@mui/material/Chip'
import Zoom from '@mui/material/Zoom'
import Box from '@mui/material/Box'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import RedoIcon from '@mui/icons-material/Redo'
import UndoIcon from '@mui/icons-material/Undo'
import IconButton from '@mui/material/IconButton'
import clsx from 'clsx'

const useStyles = makeStyles({
  menuBar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '5px',
    alignItems: 'center',
    margin: '5px auto 30px auto',
  },
  chipsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '5px',
    padding: '15px 30px',
    height: '35px',
    '&.active': {
      backgroundColor: 'purple',
    },
  },
  tools: {
    marginTop: '15px',
    height: '50px',
  },
  redo: {
    position: 'absolute',
    right: 100,
    bottom: 25,
  },
  undo: {
    position: 'absolute',
    left: 100,
    bottom: 80,
  },
})

function Menu(props) {
  const classes = useStyles()
  const {
    userDraw, setUserDraw, setIsInAction, clear, socket, undoCanvas, redoCanvas,
  } = props

  const [anchorEl, setAnchorEl] = useState(null)
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  const activePen = () => {
    setUserDraw({
      ...userDraw,
      pen: { ...userDraw.pen, isActive: true },
      eraser: { ...userDraw.eraser, isActive: false },
      fill: { ...userDraw.fill, isActive: false },
      clear: { ...userDraw.clear, isActive: false },
      undo: { ...userDraw.undo, isActive: false },
      redo: { ...userDraw.redo, isActive: false },
    })
    setIsInAction(false)
  }
  const activeEraser = () => {
    setUserDraw({
      ...userDraw,
      pen: { ...userDraw.pen, isActive: false },
      eraser: { ...userDraw.eraser, isActive: true },
      fill: { ...userDraw.fill, isActive: false },
      clear: { ...userDraw.clear, isActive: false },
      undo: { ...userDraw.undo, isActive: false },
      redo: { ...userDraw.redo, isActive: false },
    })
    setIsInAction(false)
  }
  const activeFill = () => {
    setUserDraw({
      ...userDraw,
      pen: { ...userDraw.pen, isActive: false },
      eraser: { ...userDraw.eraser, isActive: false },
      fill: { ...userDraw.fill, isActive: true },
      clear: { ...userDraw.clear, isActive: false },
      undo: { ...userDraw.undo, isActive: false },
      redo: { ...userDraw.redo, isActive: false },
    })
    setIsInAction(false)
  }

  const activeClear = () => {
    /** set Dont work ??!! */
    userDraw.pen.isActive = false
    userDraw.fill.isActive = false
    userDraw.eraser.isActive = false
    userDraw.clear.isActive = true
    userDraw.undo.isActive = false
    userDraw.redo.isActive = false
    userDraw.redo.redoList = []
    userDraw.undo.undoList = []
    clear({ ...userDraw, senderId: socket.id })
    setIsInAction(false)
  }

  const activeUndo = () => {
    userDraw.pen.isActive = false
    userDraw.fill.isActive = false
    userDraw.eraser.isActive = false
    userDraw.redo.isActive = false
    userDraw.undo.isActive = true

    undoCanvas({ ...userDraw, senderId: socket.id })
  }
  const activeRedo = () => {
    userDraw.pen.isActive = false
    userDraw.fill.isActive = false
    userDraw.eraser.isActive = false
    userDraw.redo.isActive = false
    userDraw.undo.isActive = false
    userDraw.redo.isActive = true

    redoCanvas({ ...userDraw, senderId: socket.id })
  }

  const checked = userDraw.pen.isActive || userDraw.eraser.isActive
   || userDraw.fill.isActive
  return (
    <Container
      maxWidth="sm"
      className={classes.menuBar}
      aria-owns={open ? 'tool-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Box className={classes.chipsContainer}>
        <Chip className={clsx(classes.chip, userDraw.pen.isActive && 'active')} color="primary" icon={<BrushIcon />} label="Pinceau" onClick={() => { activePen() }} />
        <Chip className={clsx(classes.chip, userDraw.eraser.isActive && 'active')} color="primary" icon={<AutoFixNormalIcon />} label="Gomme" onClick={() => { activeEraser() }} />
        <Chip className={clsx(classes.chip, userDraw.fill.isActive && 'active')} color="primary" icon={<FormatColorFillIcon />} label="Remplissage" onClick={() => { activeFill() }} />
        <Chip className={classes.chip} color="primary" icon={<HighlightOffIcon />} label="Effacer tout" onClick={() => { activeClear() }} />
      </Box>
      <IconButton
        className={classes.undo}
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={() => activeUndo()}

      >
        <UndoIcon />
      </IconButton>
      <IconButton
        className={classes.redo}
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={() => activeRedo()}
      >
        <RedoIcon />
      </IconButton>
      <Box className={classes.tools}>
        <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
          <Box>
            {userDraw.pen.isActive && (
              <>
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
              </>
            )}

            {userDraw.eraser.isActive && (
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
            )}

            {userDraw.fill.isActive && (
              <input
                type="color"
                value={userDraw.fill.color}
                onChange={(e) => setUserDraw({
                  ...userDraw,
                  fill: { ...userDraw.fill, color: e.target.value },
                })}
              />
            )}

          </Box>

        </Zoom>
      </Box>

    </Container>
  )
}
export default Menu
