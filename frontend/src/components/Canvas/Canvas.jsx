import React, {
  useState, useRef, useEffect, useContext,
} from 'react'

import './Canvas.scss'

import Container from '@mui/material/Container'
import { fillCanvas } from './FillCanvas'
import Menu from './Menu'
import { SocketContext } from '../../context/socket'
import Header from '../Header/Header'
import Tagline from '../Animation/Tagline'
import Timer from '../Timer/Timer'
import Alert from '../Alert/Alert'

function Canvas({ userRole }) {
  const socket = useContext(SocketContext)
  const [alert, setAlert] = useState({
    open: false,
    title: 'Temps écoulé',
    text: 'Le temps est écoulé... \n Un nouveau penTeur va être choisi',
    type: 'danger',
  })

  // Canvas
  const canvasRef = useRef(null)

  const [canvasDim, setCanvasDim] = useState({ width: 0, height: 0 })

  const [isInAction, setIsInAction] = useState(false)
  const [time, setTime] = useState(-1)

  const handleTimeLeft = (newTime) => setTime(newTime)

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

  const getCanvasDimensions = () => ({ height: document.getElementById('draw').offsetHeight, width: document.getElementById('draw').offsetWidth })
  const getContext = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.lineJoin = 'round'
    context.lineCap = 'round'

    return context
  }

  /** Draw */
  const draw = (drawObject) => {
    const context = getContext()

    context.beginPath()

    context.moveTo(drawObject.x0, drawObject.y0)
    context.lineTo(drawObject.x1, drawObject.y1)

    context.strokeStyle = drawObject.pen.color
    context.lineWidth = drawObject.pen.width
    context.lineJoin = 'round'
    context.lineCap = 'round'

    context.stroke()
    context.closePath()

    if (socket && socket.id === drawObject.senderId) {
      socket.emit('draw', drawObject)
    }
  }

  /** Clean the screen with the eraser */
  const erase = (drawObject) => {
    const context = getContext()

    context.beginPath()

    context.moveTo(drawObject.x0, drawObject.y0)
    context.lineTo(drawObject.x1, drawObject.y1)

    context.strokeStyle = 'white'
    context.lineWidth = drawObject.eraser.width

    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.stroke()
    context.closePath()

    if (socket && socket.id === drawObject.senderId) {
      socket.emit('draw', drawObject)
    }
  }

  const clearCanvas = () => {
    const context = getContext()
    const canvasDimensions = getCanvasDimensions()

    context.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height)
  }

  const clear = (drawObject) => {
    clearCanvas()

    if (socket && socket.id === drawObject.senderId) {
      socket.emit('draw', drawObject)
    }
  }

  /** save the canvas */
  const saveCanvas = (keepRedoList, list) => {
    const myCanvas = document.getElementById('myCanvas')

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
      // get the context
      const context = getContext()
      const canvasDimensions = getCanvasDimensions()

      // get the last image saved
      const restore = pop.pop()
      // save a new image
      saveCanvas(true, push)

      // Create img with the data in pop
      const img = new Image()
      img.src = restore

      // clear the canvas
      context.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height)

      // draw the previous canvas
      img.onload = function reDraw() {
        context.drawImage(
          img,
          0,
          0,
          canvasDimensions.width,
          canvasDimensions.height,
          0,
          0,
          canvasDimensions.width,
          canvasDimensions.height,
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
  }

  /** get the <next> canvas */
  const redoCanvas = (drawObject) => {
    if (socket && socket.id === drawObject.senderId) {
      socket.emit('draw', drawObject)
    }
    restoreCanvas(drawObject.redo.redoList, drawObject.undo.undoList)
  }

  useEffect(() => {
    setCanvasDim({ width: document.getElementById('draw').offsetWidth, height: document.getElementById('draw').offsetHeight })
  }, [setCanvasDim, socket])

  const handleDraw = (drawObject) => {
    const context = getContext()
    const canvasDimensions = getCanvasDimensions()

    if (drawObject.senderId !== socket.id) {
      if (drawObject.pen.isActive) {
        draw(drawObject)
      } else if (drawObject.eraser.isActive) {
        erase(drawObject)
      } else if (drawObject.fill.isActive) {
        fillCanvas(drawObject, context, canvasDimensions, socket)
      } else if (drawObject.clear.isActive) {
        clear(drawObject)
      } else if (drawObject.undo.isActive) {
        undoCanvas(drawObject)
      } else if (drawObject.redo.isActive) {
        redoCanvas(drawObject)
      }
    }
  }

  const handleNoTimeLeft = () => setAlert({ ...alert, open: true, time: 4 })
  const handleCloseAlert = () => setAlert({ ...alert, open: false })

  /** Init/Update values */
  useEffect(() => {
    socket.on('challenge', clearCanvas)
    socket.on('draw', handleDraw)
    socket.on('time-left', handleTimeLeft)
    socket.on('no-time-left', handleNoTimeLeft)
    return () => {
      socket.off('challenge', clearCanvas)
      socket.off('draw', handleDraw)
      socket.off('time-left', handleTimeLeft)
      socket.off('no-time-left', handleNoTimeLeft)
    }
  }, [socket, setCanvasDim])

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
    const context = getContext()
    setIsInAction(true)

    saveCanvas(false)

    const pos = getPositionOnEvent(e)
    setUserDraw({
      ...userDraw, x0: pos.X, x1: pos.X, y0: pos.Y, y1: pos.Y,
    })
    if (userDraw.fill.isActive) {
      setUserDraw({
        ...userDraw, color: context.strokeStyle,
      })
      fillCanvas({
        ...userDraw,
        x0: pos.X,
        y0: pos.Y,
        senderId: socket.id,
      }, context, canvasDim, socket)
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

  return (
    <Container maxWidth="xl" className="canvas-container">
      <div className="header-container">
        {userRole === 'server' && (
          <>
            <Timer time={time} />
            <Header type="in-line" />
          </>
        )}
      </div>
      <div id="draw" className="draw-area">
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
        ? (
          <Menu
            userDraw={userDraw}
            setUserDraw={setUserDraw}
            setIsInAction={setIsInAction}
            clear={clear}
            socket={socket}
            undoCanvas={undoCanvas}
            redoCanvas={redoCanvas}
          />
        )
        : (
          <div className="icon">
            <Tagline />
          </div>
        )}
      <Alert
        type={alert.type}
        open={alert.open}
        handleClose={handleCloseAlert}
        title={alert.title}
        text={alert.text}
        time={alert.time}
      />
    </Container>
  )
}

export default Canvas
