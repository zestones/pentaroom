import React, { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'

import Menu from './Menu'
import Header from './Header'

/** Canvas Styles */
const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  drawArea: {
    flexGrow: '1',
    maxWidth: '100%',
    position: 'relative',
    backgroundColor: 'white',
    marginTop: '5px',
  },
})

function Canvas() {
  // Canvas
  const canvasRef = useRef(null)

  // Initial value of tools
  const [pen, setPen] = useState({ isActive: true, width: 10, color: '#000000' })
  const [eraser, setEraser] = useState({ isActive: false, width: 10 })
  const [ctx, setCtx] = useState(null)

  const [canvasDim, setCanvasDim] = useState({ width: 0, height: 0 })

  const [isInAction, setIsInAction] = useState(false)

  /** Init/Update values */
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.lineJoin = 'round'
    context.lineCap = 'round'

    setCanvasDim({ width: document.getElementById('draw').offsetWidth, height: document.getElementById('draw').offsetHeight })

    setCtx(context)
  }, [setCtx, setCanvasDim])

  /** get current position on the screen */
  const getPositionOnEvent = (e) => {
    let X
    let Y

    // handle touch Event and Mouse Event
    if (window.TouchEvent && e.nativeEvent instanceof TouchEvent) {
      const canv = e.target.getBoundingClientRect()
      X = e.targetTouches[0].pageX - canv.left
      Y = e.targetTouches[0].pageY - canv.top
    } else {
      X = e.nativeEvent.offsetX
      Y = e.nativeEvent.offsetY
    }
    return { X, Y }
  }

  /** Draw */
  const draw = (e) => {
    const pos = getPositionOnEvent(e)
    ctx.strokeStyle = pen.color
    ctx.lineWidth = pen.width
    ctx.lineTo(pos.X, pos.Y)
    ctx.stroke()
  }

  /** Clean the screen with the eraser */
  const erase = (e) => {
    const pos = getPositionOnEvent(e)
    // Center the pointer in the middle of the rectangle
    ctx.eraser = eraser.width
    ctx.clearRect(
      pos.X - ctx.eraser / 2,
      pos.Y - ctx.eraser / 2,
      ctx.eraser,
      ctx.eraser,
    )
  }

  /** Start the drawing */
  const handleTouchStart = (e) => {
    setIsInAction(true)

    ctx.beginPath()

    const pos = getPositionOnEvent(e)

    ctx.moveTo(pos.X, pos.Y)
  }

  /** handle the mouse mouvement */
  const handleTouchMove = (e) => {
    if (!isInAction) return
    if (pen.isActive) {
      draw(e)
    } else if (eraser.isActive) {
      erase(e)
    }
  }

  const handleTouchEnd = () => {
    ctx.closePath()
    setIsInAction(false)
  }

  const clear = () => {
    ctx.clearRect(0, 0, canvasDim.width, canvasDim.height)
  }

  const classes = useStyles()

  return (
    <Container maxWidth="xl" className={classes.main}>
      <Header />
      <div id="draw" className={classes.drawArea}>
        <canvas
          id="myCanvas"
          onTouchStart={handleTouchStart}
          onMouseDown={handleTouchStart}
          onTouchMove={handleTouchMove}
          onMouseMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseUp={handleTouchEnd}
          ref={canvasRef}
          width={canvasDim.width}
          height={canvasDim.height}
        />
      </div>

      <Menu
        pen={pen}
        setPen={setPen}
        eraser={eraser}
        setEraser={setEraser}
        setIsInAction={setIsInAction}
        clear={clear}
      />
    </Container>
  )
}

export default Canvas
