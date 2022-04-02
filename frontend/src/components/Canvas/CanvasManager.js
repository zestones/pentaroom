const fillCanvas = require('./FillCanvas')

class CanvasManager {
  constructor(canvasRef) {
    console.log('ctx')
    this.ctx = canvasRef.current.getContext('2d')
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.canvasWidth = document.getElementById('draw').offsetWidth
    this.canvasHeight = document.getElementById('draw').offsetHeight
  }

  draw(drawObject) {
    this.ctx.beginPath()

    this.ctx.moveTo(drawObject.x0, drawObject.y0)
    this.ctx.lineTo(drawObject.x1, drawObject.y1)

    this.ctx.strokeStyle = drawObject.pen.color
    this.ctx.lineWidth = drawObject.pen.width
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'

    this.ctx.stroke()
    this.ctx.closePath()
  }

  erase(drawObject) {
    this.ctx.beginPath()

    this.ctx.moveTo(drawObject.x0, drawObject.y0)
    this.ctx.lineTo(drawObject.x1, drawObject.y1)

    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = drawObject.eraser.width

    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.stroke()
    this.ctx.closePath()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  redraw(img) {
    this.ctx.drawImage(
      img,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight,
    )
  }

  fill(drawObject, socket) {
    fillCanvas(drawObject, this.ctx, { width: this.canvasWidth, height: this.canvasHeight }, socket)
  }

  getColor() {
    return this.ctx.strokeStyle
  }

  setColor(color) {
    this.ctx.strokeStyle = color
  }
}

module.exports = CanvasManager
