import React from 'react'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { makeStyles } from '@mui/styles'
import { deepOrange } from '@mui/material/colors'

const useStyles = makeStyles({
  isNotHighScore: {
    width: '28px',
    height: '19px',
    marginRight: '5px',
    fill: '#F0F0F0',
  },
  isHighScore: {
    width: '28px',
    height: '19px',
    marginRight: '5px',
    fill: '#FFC657',
    animation: 'grow 0.35s ease-in-out',
    transformOrigin: '50% 50%',
  },

  player: {
    display: 'flex',
    fontSize: '1.2em',
    borderBottom: 'solid 2px #EEEEEE',
    letterSpacing: '2px',
  },
  playerName: {
    flexGrow: '1',
    lineHeight: '3.5em',
    paddingLeft: '10px',
  },
  score: {
    marginRight: '180px',
    marginTop: '25px',
  },
  avatar: {
    marginRight: '100px',
    marginTop: '15px',
  },
})

function Player({ name, score, isHighScore }) {
  const classes = useStyles()

  return (
    <div className={classes.player}>
      <span className={classes.playerName}>
        <svg viewBox="0 0 44 35" className={isHighScore ? classes.isHighScore : classes.isNotHighScore}>
          <path d="M26.7616 10.6207L21.8192 0L16.9973 10.5603C15.3699 14.1207 10.9096 15.2672 7.77534 12.9741L0 7.24138L6.56986 28.8448H37.0685L43.5781 7.72414L35.7425 13.0948C32.6685 15.2672 28.3288 14.0603 26.7616 10.6207Z" transform="translate(0 0.301727)" />
          <rect width="30.4986" height="3.07759" transform="translate(6.56987 31.5603)" />
        </svg>
        {name}
      </span>
      <span className={classes.score}>
        {score}
      </span>
      <div className={classes.avatar}>
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>{name.substr(0, 1)}</Avatar>
        </Stack>
      </div>
    </div>
  )
}

export default Player
