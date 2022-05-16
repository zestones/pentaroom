import React, {
  useState, useRef, useEffect, useContext,
} from 'react'

import Container from '@mui/material/Container'
import clsx from 'clsx'
import styles from './Canvas.module.scss'
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
    width: 0,
    height: 0,
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
  })

  const getCanvasDimensions = () => ({ height: document.getElementById('draw').offsetHeight, width: document.getElementById('draw').offsetWidth })
  const getContext = () => {
    const canvas = canvasRef.current

    // if (!canvas) {
    //   socket.emit('update-drawer')
    // }
    const context = canvas.getContext('2d')

    context.lineJoin = 'round'
    context.lineCap = 'round'

    return context
  }

  /**
   * Draw on the canvas
   * @param {*} drawObject
   */
  const draw = (drawObject) => {
    const context = getContext()

    context.beginPath()

    context.strokeStyle = drawObject.pen.color
    context.lineWidth = drawObject.pen.width
    context.lineJoin = 'round'
    context.lineCap = 'round'

    if (socket && socket.id === drawObject.senderId) {
      context.moveTo(drawObject.x0, drawObject.y0)
      context.lineTo(drawObject.x1, drawObject.y1)

      socket.emit('draw', drawObject)
    } else {
      const CD = getCanvasDimensions()
      const factor = (CD.width / drawObject.width < CD.height / drawObject.height)
        ? CD.width / drawObject.width
        : CD.height / drawObject.height

      const margin = {
        top: (CD.height - drawObject.height * factor) / 2,
        left: (CD.width - drawObject.width * factor) / 2,
      }

      context.moveTo(drawObject.x0 * factor + margin.left, drawObject.y0 * factor + margin.top)
      context.lineTo(drawObject.x1 * factor + margin.left, drawObject.y1 * factor + margin.top)
    }
    context.stroke()

    context.closePath()
  }

  /**
   * Clean the screen with the eraser
   * @param {*} drawObject
   */
  const erase = (drawObject) => {
    const context = getContext()

    context.beginPath()

    context.lineJoin = 'round'
    context.lineCap = 'round'

    context.strokeStyle = 'white'
    context.lineWidth = drawObject.eraser.width

    if (socket && socket.id === drawObject.senderId) {
      context.moveTo(drawObject.x0, drawObject.y0)
      context.lineTo(drawObject.x1, drawObject.y1)
      socket.emit('draw', drawObject)
    } else {
      const CD = getCanvasDimensions()
      const factor = (CD.width / drawObject.width < CD.height / drawObject.height)
        ? CD.width / drawObject.width
        : CD.height / drawObject.height

      const margin = {
        top: (CD.height - drawObject.height * factor) / 2,
        left: (CD.width - drawObject.width * factor) / 2,
      }

      context.moveTo(drawObject.x0 * factor + margin.left, drawObject.y0 * factor + margin.top)
      context.lineTo(drawObject.x1 * factor + margin.left, drawObject.y1 * factor + margin.top)
    }

    context.stroke()
    context.closePath()
  }

  // Clear the whole canvas
  const clearCanvas = () => {
    const context = getContext()
    const canvasDimensions = getCanvasDimensions()

    context.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height)
  }

  // clear the server & client canvas
  const clear = (drawObject) => {
    clearCanvas()

    if (socket && socket.id === drawObject.senderId) {
      socket.emit('draw', drawObject)
    }
  }

  useEffect(() => {
    setCanvasDim({ width: document.getElementById('draw').offsetWidth, height: document.getElementById('draw').offsetHeight })
  }, [setCanvasDim, socket])

  const handleDraw = (drawObject) => {
    if (drawObject.senderId !== socket.id) {
      if (drawObject.pen.isActive) {
        draw(drawObject)
      } else if (drawObject.eraser.isActive) {
        erase(drawObject)
      } else if (drawObject.clear.isActive) {
        clear(drawObject)
      }
    }
  }
  // handle the timer events
  const handleNoTimeLeft = () => setAlert({ ...alert, open: true, time: 4 })
  // close the alert
  const handleCloseAlert = () => setAlert({ ...alert, open: false })

  // Init/Update values
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

  // get current position on the screen
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

  /**
   * Start the drawing
   * @param {Event} e
   * @returns
   */
  const handleTouchStart = (e) => {
    if (userRole === 'server') return
    setIsInAction(true)

    // saveCanvas(false)

    const pos = getPositionOnEvent(e)
    setUserDraw({
      ...userDraw,
      width: canvasDim.width,
      height: canvasDim.height,
      x0: pos.X,
      x1: pos.X,
      y0: pos.Y,
      y1: pos.Y,
    })
  }

  /**
   * handle the mouse mouvement
   * @param {Event} e
   * @returns
   */
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

  // Stop the drawing
  const handleTouchEnd = () => {
    setIsInAction(false)
  }

  return (
    <Container maxWidth="xl" className={clsx(styles.canvasContainer, (userRole === 'server') ? styles.server : '')}>
      <div className="header-container">
        {userRole === 'server' && (
          <>
            <Timer time={time} />
            <Header type="in-line" />
          </>
        )}
      </div>
      <div id="draw" className={styles.drawArea}>
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
          />
        )
        : (
          <>
            <Alert
              type={alert.type}
              open={alert.open}
              handleClose={handleCloseAlert}
              title={alert.title}
              text={alert.text}
              time={alert.time}
            />
            <div className={styles.icon}>
              <Tagline />
            </div>
          </>
        )}
    </Container>
  )
}

export default Canvas
