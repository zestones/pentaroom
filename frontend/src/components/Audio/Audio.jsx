import React from 'react'
import ReactHowler from 'react-howler'

function SoundManager({
  url, vol, play, looping,
}) {
  return (
    <ReactHowler
      src={url}
      playing={play}
      loop={looping}
      volume={vol}
    />
  )
}

export default SoundManager
