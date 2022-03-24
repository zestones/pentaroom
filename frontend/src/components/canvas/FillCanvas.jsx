/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */

/** get the color of the pixel */
const getPixelColor = (imageData, x, y) => {
  if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
    return [-1, -1, -1, -1] // impossible color
  }

  const offset = (y * imageData.width + x) * 4
  return imageData.data.slice(offset, offset + 4)
}

const compareColor = (color1, color2) => {
  for (let i = 0; i < color2.length; i += 1) {
    if (color1[i] !== color2[i]) return false
  }
  return true
}
/** draw the pixel */
const drawPixel = (imageData, x, y, color) => {
  const offset = (y * imageData.width + x) * 4
  imageData.data[offset + 0] = color[0]
  imageData.data[offset + 1] = color[1]
  imageData.data[offset + 2] = color[2]
  imageData.data[offset + 3] = 255
}

/** convert hex color to rgb */
const hexToRgb = (h) => {
  let r = 0
  let g = 0
  let b = 0

  // 3 digits
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`
    g = `0x${h[2]}${h[2]}`
    b = `0x${h[3]}${h[3]}`

    // 6 digits
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`
    g = `0x${h[3]}${h[4]}`
    b = `0x${h[5]}${h[6]}`
  }

  return [+r, +g, +b]
}

export const fillCanvas = (drawObject, ctx, canvasDim, socket) => {
  const fillColor = hexToRgb(drawObject.fill.color)

  // get the data of the current canvas
  const imgData = ctx.getImageData(
    0,
    0,
    canvasDim.width,
    canvasDim.height,
  )
  // get the color targeted
  const targetColor = getPixelColor(imgData, drawObject.x0, drawObject.y0)
  if (!compareColor(targetColor, fillColor)) {
    // recursivity don't work !
    // creation of a stack whith the position
    const stack = [drawObject.x0, drawObject.y0]

    while (stack.length > 0) {
      const y = stack.pop()
      const x = stack.pop()

      const currentColor = getPixelColor(imgData, x, y)
      // the color targeted is the same as the current color pixel
      if (compareColor(targetColor, currentColor)) {
        // fill the pixel
        drawPixel(imgData, x, y, fillColor)
        // we check the four direction
        stack.push(x + 1, y)
        stack.push(x - 1, y)
        stack.push(x, y + 1)
        stack.push(x, y - 1)
      }
    }
  }
  // put the new data
  ctx.putImageData(imgData, 0, 0)
  if (socket && socket.id === drawObject.senderId) {
    socket.emit('draw', drawObject)
  }
}
