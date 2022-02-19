import React, { useState, useRef, useEffect } from 'react'
import { createUseStyles } from 'react-jss'

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
  title: {
    border: '2px solid green',
    color: 'red',
    margin: '1% 1%',
  },
  drawArea: {
    width: '80%',
    height: '80%',
    border: '2px solid black',
    position: 'relative',
    backgroundColor: 'white',
  },
})

function Canvas() {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const lineWidth = useState(10)
  const lineColor = useState('black')

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.strokeStyle = lineColor
    context.lineWidth = lineWidth
    contextRef.current = context
  }, [lineWidth, lineColor])

  const startDrawing = (e) => {
    contextRef.current.beginPath()
    contextRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)

    setIsDrawing(true)
  }
  const endDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = (e) => {
    if (isDrawing) {
      contextRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      contextRef.current.stroke()
    }
  }
  return (
    <div className={styles().canvas}>
      <h1 className={styles().title}>Hello</h1>
      <div id="draw" className={styles().drawArea}>
        <canvas
          className={styles().test}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width="1250px"
          height="720px"
        />
      </div>
    </div>
  )
}

export default Canvas
