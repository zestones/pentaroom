/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import Avatar, { genConfig } from 'react-nice-avatar'

const useStyles = makeStyles({
  container: {
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
    flexDirection: 'column',

  },
  subcontainer: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatar: {
    border: 'thick double black',
    width: '5rem',
    height: '5rem',
  },
})

function ScoreBoard() {
  const [config] = useState({
    sex: 'woman',
    faceColor: 'white',
    earSize: 'small',
    eyeStyle: 'smile',
    noseStyle: 'short',
    mouthStyle: 'peace',
    shirtStyle: 'polo',
    glassesStyle: 'round',
    hairColor: '#000',
    hairStyle: 'womanShort',
    hatStyle: 'none',
    hatColor: '#000',
    eyeBrowStyle: 'up',
    shirtColor: '#F4D150',
    bgColor: 'linear-gradient(45deg, #176fff 0%, #68ffef 100%)',
  })

  const myAvatar = genConfig(config)

  const listPlayers = [
    {
      imgSrc: '',
      name: 'islem',
      score: '10 / 100',
    },
    {
      imgSrc: './test.png',
      name: 'ghilas',
      score: '80 / 100',
    },
    {
      imgSrc: 'test.png',
      name: 'idriss',
      score: '90 / 100',
    },
    {
      imgSrc: 'test.png',
      name: 'moha',
      score: '70 / 100',
    },
    {
      imgSrc: 'test.png',
      name: 'moha2',
      score: '60 / 100',
    },
    {
      imgSrc: 'test.png',
      name: 'ANTOINE',
      score: '100 / 100',
    },
  ]
  const classes = useStyles()

  return (
    <Container className={classes.container} maxWidth="xxl">
      <div className="card">
        <div className="card-body" />
        <table className="table table-borderless">
          <tbody>
            {
              listPlayers.map((el, index) => (
                <tr>
                  <td className="border-0">
                    <b className={index + 1 === 1 || index + 1 === 2 || index + 1 === 3 ? 'text-danger' : ' '}>
                      {index + 1 === 1 ? '1st' : index + 1 === 2 ? '2nd' : index + 1 === 3 ? '3rd' : index + 1}

                    </b>
                  </td>
                  <td className="border-0">
                    <div className="d-flex">
                      <Avatar className={classes.avatar} {...myAvatar} />
                      <div className="align-self-center pl-3" />
                      <span className="font-weight-bold">{el.name}</span>
                    </div>
                  </td>
                  <td className="border-0">{el.score}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </Container>
  )
}

export default ScoreBoard
