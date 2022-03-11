import React, { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import { fillCanvas } from './FillCanvas'
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

function Canvas({ socket }) {
  // Canvas
  const canvasRef = useRef(null)

  const [ctx, setCtx] = useState(null)

  const [canvasDim, setCanvasDim] = useState({ width: 0, height: 0 })

  const [isInAction, setIsInAction] = useState(false)

  const [userDraw, setUserDraw] = useState({
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    pen: {
      isActive: true,
      color: '#000000',
      width: 10,
    },
    eraser: {
      isActive: false,
      width: 10,
    },
    fill: {
      isActive: false,
      color: '',
    },
    clear: {
      isActive: false,
    },
  })

  /** Draw */
  const draw = (drawObject) => {
    ctx.beginPath()

    ctx.moveTo(drawObject.x0, drawObject.y0)
    ctx.lineTo(drawObject.x1, drawObject.y1)

    ctx.strokeStyle = drawObject.pen.color
    ctx.lineWidth = drawObject.pen.width
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    ctx.stroke()
    ctx.closePath()

    if (socket && socket.id === drawObject.senderId) {
      socket.emit('draw', drawObject)
    }
  }

  /** Clean the screen with the eraser */
  const erase = (drawObject) => {
    ctx.beginPath()

    ctx.moveTo(drawObject.x0, drawObject.y0)
    ctx.lineTo(drawObject.x1, drawObject.y1)

    ctx.strokeStyle = 'white'
    ctx.lineWidth = drawObject.eraser.width

    ctx.stroke()
    ctx.closePath()

    if (socket && socket.id === drawObject.senderId) {
      socket.emit('draw', drawObject)
    }
  }

  const clear = (drawObject) => {
    ctx.clearRect(0, 0, canvasDim.width, canvasDim.height)
    if (socket && socket.id === drawObject.senderId) {
      socket.emit('draw', drawObject)
    }
  }

  /** Init/Update values */
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.lineJoin = 'round'
    context.lineCap = 'round'

    setCanvasDim({ width: document.getElementById('draw').offsetWidth, height: document.getElementById('draw').offsetHeight })

    setCtx(context)

    if (socket) {
      socket.on('draw', (drawObject) => {
        if (drawObject.senderId !== socket.id) {
          if (drawObject.pen.isActive) {
            draw(drawObject)
          } else if (drawObject.eraser.isActive) {
            erase(drawObject)
          } else if (drawObject.fill.isActive) {
            fillCanvas(drawObject, ctx, canvasDim, socket)
          } else if (drawObject.clear.isActive) {
            clear(drawObject)
          }
        }
      })
    }
  }, [socket, setCtx, setCanvasDim])

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

  /** Start the drawing */
  const handleTouchStart = (e) => {
    setIsInAction(true)
    const pos = getPositionOnEvent(e)
    setUserDraw({
      ...userDraw, x0: pos.X, x1: pos.X, y0: pos.Y, y1: pos.Y,
    })
    if (userDraw.fill.isActive) {
      setUserDraw({
        ...userDraw, color: ctx.strokeStyle,
      })
      fillCanvas({
        ...userDraw,
        x0: pos.X,
        y0: pos.Y,
        senderId: socket.id,
      }, ctx, canvasDim, socket)
    }
  }

  /** handle the mouse mouvement */
  const handleTouchMove = (e) => {
    if (!isInAction) return
    if (userDraw.pen.isActive) {
      const pos = getPositionOnEvent(e)
      setUserDraw({
        ...userDraw, x0: userDraw.x1, y0: userDraw.y1, x1: pos.X, y1: pos.Y,
      })
      draw({ ...userDraw, senderId: socket.id })
    } else if (userDraw.eraser.isActive) {
      const pos = getPositionOnEvent(e)
      setUserDraw({
        ...userDraw, x0: userDraw.x1, y0: userDraw.y1, x1: pos.X, y1: pos.Y,
      })
      erase({ ...userDraw, senderId: socket.id })
    }
  }

  const handleTouchEnd = () => {
    setIsInAction(false)
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
        userDraw={userDraw}
        setUserDraw={setUserDraw}
        setIsInAction={setIsInAction}
        clear={clear}
        socket={socket}
      />
    </Container>
  )
}

export default Canvas
