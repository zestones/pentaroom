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

  // Initial value of tools
  const [lineWidth, setLineWidth] = useState(10)
  const [lineColor, setLineColor] = useState('black')
  const [eraserSize, setEraserSize] = useState(50)

  // Init state of the mouse Pressed / Released
  const [isDrawingLine, setIsDrawing] = useState(false)
  const [isDrawingRect, setIsDrawingRect] = useState(false)
  const [isCleaning, setIsCleaning] = useState(false)

  // define a toolBox
  const [tools, setTools] = useState({
    pen: false,
    eraser: false,
    clearAll: false,
    rectangle: false,
  })

  // Rectangle Object
  const [rect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }, setRect] = useState({})

  /** Init/Update values depending  */
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.lineJoin = 'round'
    context.lineCap = 'round'

    context.strokeStyle = lineColor
    context.lineWidth = lineWidth
    context.eraser = eraserSize

    context.width = document.getElementById('draw').offsetWidth
    context.height = document.getElementById('draw').offsetHeight

    contextRef.current = context
  }, [lineWidth, lineColor, eraserSize])

  /** Clear the canvas */
  const clearCanvas = () => {
    if (tools.clearAll) {
      contextRef.current.clearRect(0, 0, contextRef.current.width, contextRef.current.height)
    }
  }

  /** get current position on the screen */
  const getPosition = (e) => {
    // On mobile event ==> onTouch.. Event OffsetX/Y dont exist
    // contextRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    const canv = e.target.getBoundingClientRect()

    const X = e.targetTouches[0].pageX - canv.left
    const Y = e.targetTouches[0].pageY - canv.top

    return { X, Y }
  }
  /** Start the drawing */
  const startDrawing = (e) => {
    contextRef.current.beginPath()

    const pos = getPosition(e)
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
  }
  /** Draw */
  const draw = (e) => {
    const pos = getPosition(e)

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
  }

  /** Clean */
  const clean = (e) => {
    if (isCleaning) {
      const pos = getPosition(e)
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

  /** Set Dimension of the canvas after the render */
  const setCanvasWidth = () => {
    if (document.getElementById('draw') == null) return 200
    return document.getElementById('draw').offsetWidth
  }

  const setCanvasHeight = () => {
    if (document.getElementById('draw') == null) return 300
    return document.getElementById('draw').offsetHeight
  }

  return (
    <div className={styles().canvas}>
      <Header />
      <div id="draw" className={styles().drawArea}>
        <canvas
          className={styles().test}
          onTouchStart={startDrawing}
          onTouchMove={handleMouseMouvement}
          onTouchEnd={endDrawing}
          ref={canvasRef}
          width={setCanvasWidth()}
          height={setCanvasHeight()}
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
      />
    </div>
  )
}

export default Canvas
