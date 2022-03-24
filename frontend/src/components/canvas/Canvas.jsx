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

function Canvas({ socket, userRole }) {
  // Canvas
  const canvasRef = useRef(null)

  const [ctx, setCtx] = useState(null)

  const [canvasDim, setCanvasDim] = useState({ width: 0, height: 0 })

  const [isInAction, setIsInAction] = useState(false)

  const myCanvas = document.getElementById('myCanvas')

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
      color: '#000000',
    },
    clear: {
      isActive: false,
    },
    undo: {
      undoList: [],
      isActive: false,
    },
    redo: {
      redoList: [],
      isActive: false,
    },
  })

  const activeDefaultTool = () => {
    ctx.strokeStyle = userDraw.pen.color
    setUserDraw({
      ...userDraw,
      pen: { ...userDraw.pen, isActive: true },
    })
  }

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

    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
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
    activeDefaultTool()
  }

  /** save the canvas */
  const saveCanvas = (keepRedoList, list) => {
    if (!keepRedoList) {
      userDraw.redo.redoList = []
    }
    (list || userDraw.undo.undoList).push(myCanvas.toDataURL())
  }

  /** restore the canvas */
  // pop is the array which the img will be restored
  // push is the array which a new img will be added
  const restoreCanvas = (pop, push) => {
    if (pop.length) {
      // get the last image saved
      const restore = pop.pop()
      // save a new image
      saveCanvas(true, push)

      // Create img with the data in pop
      const img = new Image()
      img.src = restore

      // clear the canvas
      ctx.clearRect(0, 0, canvasDim.width, canvasDim.height)

      // draw the previous canvas
      img.onload = function reDraw() {
        ctx.drawImage(
          img,
          0,
          0,
          canvasDim.width,
          canvasDim.height,
          0,
          0,
          canvasDim.width,
          canvasDim.height,
        )
      }
    }
  }

  /** get the previous canvas */
  const undoCanvas = (drawObject) => {
    if (socket && socket.id === drawObject.senderId) {
      socket.emit('draw', drawObject)
    }
    restoreCanvas(drawObject.undo.undoList, drawObject.redo.redoList)
    activeDefaultTool()
  }

  /** get the <next> canvas */
  const redoCanvas = (drawObject) => {
    if (socket && socket.id === drawObject.senderId) {
      socket.emit('draw', drawObject)
    }
    restoreCanvas(drawObject.redo.redoList, drawObject.undo.undoList)
    activeDefaultTool()
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
          } else if (drawObject.undo.isActive) {
            undoCanvas(drawObject)
          } else if (drawObject.redo.isActive) {
            redoCanvas(drawObject)
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
    if (userRole === 'server') return
    setIsInAction(true)

    saveCanvas(false)

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
      {(userRole !== 'server')
      && (
        <Menu
          userDraw={userDraw}
          setUserDraw={setUserDraw}
          setIsInAction={setIsInAction}
          clear={clear}
          socket={socket}
          undoCanvas={undoCanvas}
          redoCanvas={redoCanvas}
        />
      )}
    </Container>
  )
}

export default Canvas
