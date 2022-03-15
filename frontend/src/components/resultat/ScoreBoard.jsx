/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React from 'react'
import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import Player from './Player'

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'linearGradient(90deg,rgb(19, 165, 209) 0%,rgb(146, 191, 202) 100%)',
  },

  header: {
    color: '#FFF',
    padding: '5px 10px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgb(48, 18, 168)',
    borderBottom: 'solid 2px #D4CAFF',
  },

  h1: {
    flexGrow: '1',
    fontSize: '1.5em',
    letterSpacing: '2px',
    fontSeight: 'normal',
  },

})

function ScoreBoard() {
  const players = [
    {
      name: 'mohamed',
      score: 7,
      id: 1,
    },
    {
      name: 'ghilas',
      score: 5,
      id: 2,
    },
    {
      name: 'antoine',
      score: 10,
      id: 3,
    },
    {
      name: 'idris',
      score: 2,
      id: 4,
    },
    {
      name: 'islem',
      score: 10,
      id: 5,
    },

    {
      name: 'moh',
      score: 4,
      id: 6,
    },
    {
      name: 'antoine',
      score: 10,
      id: 7,
    },
    {
      name: 'idris',
      score: 2,
      id: 8,
    },
    {
      name: 'islem',
      score: 10,
      id: 9,
    },

    {
      name: 'moh',
      score: 4,
      id: 10,
    },
  ]
  const classes = useStyles()

  const getHighestScore = () => {
    const highestScore = players.reduce((score, player) => Math.max(score, player.score), 0)

    if (highestScore) {
      return highestScore
    }
    return null
  }

  return (
    <Container maxWidth="xl" className={classes.main}>
      <div className="scoreboard">
        <header className={classes.header}>
          <h1 className={classes.h1}>
            Players:
            {' '}
            {players.length}
          </h1>
          <h1>SCORE</h1>
          <h1>scoreboard</h1>
        </header>
        {players.map((player) => (
          <Player
            name={player.name}
            score={player.score}
            isHighScore={getHighestScore() === player.score}
            key={player.id.toString()}
          />
        ))}
      </div>
    </Container>
  )
}

export default ScoreBoard
