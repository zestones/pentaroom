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
})

function Menu(props) {
  const classes = useStyles()
  const {
    userDraw, setUserDraw, setIsInAction, clear,
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
    })
    setIsInAction(false)
  }
  const activeEraser = () => {
    setUserDraw({
      ...userDraw,
      pen: { ...userDraw.pen, isActive: false },
      eraser: { ...userDraw.eraser, isActive: true },
      fill: { ...userDraw.fill, isActive: false },
    })
    setIsInAction(false)
  }
  const activeFill = () => {
    setUserDraw({
      ...userDraw,
      pen: { ...userDraw.pen, isActive: false },
      eraser: { ...userDraw.eraser, isActive: false },
      fill: { ...userDraw.fill, isActive: true },
    })
    setIsInAction(false)
  }

  const checked = userDraw.pen.isActive || userDraw.eraser.isActive || userDraw.fill.isActive

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
        <Chip className={classes.chip} color="primary" icon={<HighlightOffIcon />} label="Effacer tout" onClick={() => { clear() }} />
      </Box>

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
