import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import BrushIcon from '@mui/icons-material/Brush'
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Chip from '@mui/material/Chip'
import Zoom from '@mui/material/Zoom'
import Box from '@mui/material/Box'
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
    pen, setPen, eraser, setEraser, setIsInAction, clear,
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
    setEraser({ ...eraser, isActive: false })
    setPen({ ...pen, isActive: true })
    setIsInAction(false)
  }
  const activeEraser = () => {
    setEraser({ ...eraser, isActive: true })
    setPen({ ...pen, isActive: false })
    setIsInAction(false)
  }

  const checked = pen.isActive || eraser.isActive

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
        <Chip className={clsx(classes.chip, pen.isActive && 'active')} color="primary" icon={<BrushIcon />} label="Pinceau" onClick={() => { activePen() }} />
        <Chip className={clsx(classes.chip, eraser.isActive && 'active')} color="primary" icon={<AutoFixNormalIcon />} label="Gomme" onClick={() => { activeEraser() }} />
        <Chip className={classes.chip} color="primary" icon={<HighlightOffIcon />} label="Effacer tout" onClick={() => { clear() }} />
      </Box>

      <Box className={classes.tools}>
        <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
          <Box>
            {pen.isActive && (
              <>
                <input
                  type="color"
                  value={pen.color}
                  onChange={(e) => setPen({ ...pen, color: e.target.value })}

                />
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={pen.width}
                  onChange={(e) => setPen({ ...pen, width: e.target.value })}

                />
              </>
            )}

            {eraser.isActive && (
              <input
                type="range"
                min="10"
                max="100"
                value={eraser.width}
                onChange={(e) => setEraser({ ...eraser, width: e.target.value })}

              />
            )}

          </Box>

        </Zoom>
      </Box>

    </Container>
  )
}
export default Menu
