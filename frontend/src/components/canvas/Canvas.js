import React, { useState, useRef, useEffect } from 'react'
import { createUseStyles } from 'react-jss'

import Menu from './Menu'
import Header from './Header'

/** Canvas Styles */
const styles = createUseStyles({
  canvas: {
    backgroundColor: 'grey',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  drawArea: {
    width: '80%',
    height: '75%',
    border: '2px solid black',
    position: 'relative',
    backgroundColor: 'white',
    marginTop: '1%',
  },
})

function Canvas() {
  // Canvas
  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  let canvasArea = document.getElementById('draw')
  const [canvasDim, setCanvasDim] = useState({})

  // Initial value of tools
  const [lineWidth, setLineWidth] = useState(10)
  const [lineColor, setLineColor] = useState('black')
  const [eraserSize, setEraserSize] = useState(50)

  // Init state of the mouse Pressed / Released
  const [isDrawingLine, setIsDrawing] = useState(false)
  const [isDrawingRect, setIsDrawingRect] = useState(false)
  const [isCleaning, setIsCleaning] = useState(false)
  const [isDrawingCircle, setisDrawingCircle] = useState(false)

  // define a toolBox
  const [tools, setTools] = useState({
    pen: false,
    eraser: false,
    clearAll: false,
    rectangle: false,
    circle: false,
    visible: false,
  })

  // Rectangle Object
  const [rect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }, setRect] = useState({})

  // Rectangle Object
  const [circle, setCircle] = useState({
    x: 0,
    y: 0,
    radius: 0,
    endAngle: 2 * Math.PI,
  })

  /** Init/Update values */
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.lineJoin = 'round'
    context.lineCap = 'round'

    context.strokeStyle = lineColor
    context.lineWidth = lineWidth
    context.eraser = eraserSize

    canvasArea = document.getElementById('draw')
    setCanvasDim({ width: canvasArea.offsetWidth, height: canvasArea.offsetHeight })

    contextRef.current = context
  }, [lineWidth, lineColor, eraserSize])

  /** Clear the canvas */
  const clearCanvas = () => {
    if (tools.clearAll) {
      contextRef.current.clearRect(0, 0, canvasDim.width, canvasDim.height)
      setTools((prevTools) => ({
        ...prevTools,
        clearAll: false,
      }))
    }
  }

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
  const startDrawing = (e) => {
    contextRef.current.beginPath()

    const pos = getPositionOnEvent(e)
    contextRef.current.moveTo(pos.X, pos.Y)

    if (tools.pen) setIsDrawing(true)
    if (tools.eraser) setIsCleaning(true)

    if (tools.rectangle) {
      setRect((prevRect) => ({
        ...prevRect,
        x: pos.X,
        y: pos.Y,
      }))

      setIsDrawingRect(true)
    }

    if (tools.circle) {
      setCircle((prevCircle) => ({
        ...prevCircle,
        x: pos.X,
        y: pos.Y,
      }))

      setisDrawingCircle(true)
    }
  }

  /** Draw */
  const draw = (e) => {
    const pos = getPositionOnEvent(e)

    if (isDrawingLine) {
      contextRef.current.lineTo(pos.X, pos.Y)
      contextRef.current.stroke()
    }
    if (isDrawingRect) {
      // calculate the rectangle width/height
      const w = pos.X - rect.x
      const h = pos.Y - rect.y

      setRect((prevRect) => ({
        ...prevRect,
        width: w,
        height: h,
      }))

      // draw the rectangle
      contextRef.current.strokeRect(rect.x, rect.y, rect.width, rect.height)
      // remove the inner rect
      contextRef.current.clearRect(rect.x, rect.y, rect.width, rect.height)
    }

    if (isDrawingCircle) {
      // calculate the circle radius
      const r = Math.sqrt((pos.X - circle.x) ** 2 + (pos.Y - circle.y) ** 2)
      // update the object
      setCircle((prevCircle) => ({
        ...prevCircle,
        radius: r,
      }))

      // draw the circle
      contextRef.current.arc(circle.x, circle.y, circle.radius, 0, circle.endAngle)
      contextRef.current.stroke()

      // remove the inner circle
      contextRef.current.fillStyle = 'white'
      contextRef.current.arc(circle.x, circle.y, circle.radius, 0, circle.endAngle)
      contextRef.current.fill()
    }
  }

  /** End the drawing */
  const endDrawing = () => {
    contextRef.current.closePath()
    if (isDrawingLine) setIsDrawing(false)
    if (isCleaning) setIsCleaning(false)

    if (isDrawingRect) {
      setIsDrawingRect(false)
      setRect({})
    }
    if (isDrawingCircle) {
      setisDrawingCircle(false)
      setCircle({})
      setCircle((prevCircle) => ({
        ...prevCircle,
        endAngle: 2 * Math.PI,
      }))
    }
  }

  /** Clean the screen with the eraser */
  const clean = (e) => {
    if (isCleaning) {
      const pos = getPositionOnEvent(e)
      // Center the pointer in the middle of the rectangle
      contextRef.current.clearRect(
        pos.X - contextRef.current.eraser / 2,
        pos.Y - contextRef.current.eraser / 2,
        contextRef.current.eraser,
        contextRef.current.eraser,
      )
    }
  }

  /** handle the mouse mouvement */
  const handleMouseMouvement = (e) => {
    draw(e)
    clean(e)
  }

  /** get Canavs Height */
  const getCanvasHeight = () => {
    if (canvasDim == null) return 200
    return canvasDim.height
  }

  /** get canvas Width */
  const getCanvasWidth = () => {
    if (canvasDim == null) return 200
    return canvasDim.width
  }

  return (
    <div className={styles().canvas}>
      <Header />
      <div id="draw" className={styles().drawArea}>
        <canvas
          id="myCanvas"
          className={styles().test}
          onTouchStart={startDrawing}
          onTouchMove={handleMouseMouvement}
          onTouchEnd={endDrawing}
          onMouseDown={startDrawing}
          onMouseMove={handleMouseMouvement}
          onMouseUp={endDrawing}
          ref={canvasRef}
          width={getCanvasWidth()}
          height={getCanvasHeight()}
        />
        {clearCanvas()}
      </div>

      <Menu
        setLineColor={setLineColor}
        setLineWidth={setLineWidth}
        lineWidth={lineWidth}
        setTools={setTools}
        setEraserSize={setEraserSize}
        eraser={eraserSize}
        tools={tools}
      />
    </div>
  )
}

export default Canvas
