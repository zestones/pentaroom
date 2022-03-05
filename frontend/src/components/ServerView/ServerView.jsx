import React from 'react'
import Canvas from '../canvas/Canvas'

function ServerView({ socket }) {
  return (
    <Canvas socket={socket} />
  )
}
export default ServerView
