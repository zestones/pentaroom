/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React from 'react'
import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Confetti from 'react-confetti'
import { deepOrange } from '@mui/material/colors'

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'linearGradient(90deg,rgb(19, 165, 209) 0%,rgb(146, 191, 202) 100%)',
  },
  player: {
    display: 'flex',
    flexDirection: 'row',
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
  h1: {
    flexGplayer: '1',
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
      highScore: true,
    },
    {
      name: 'ghilas',
      score: 5,
      id: 2,
      highScore: false,
    },
    {
      name: 'antoine',
      score: 10,
      id: 3,
      highScore: false,
    },
    {
      name: 'idris',
      score: 2,
      id: 4,
      highScore: false,
    },
    {
      name: 'islem',
      score: 10,
      id: 5,
      highScore: false,
    },

    {
      name: 'moh',
      score: 4,
      id: 6,
      highScore: false,

    },
    {
      name: 'antoine',
      score: 10,
      id: 7,
      highScore: false,

    },
    {
      name: 'idris',
      score: 2,
      id: 8,
      highScore: false,
    },
    {
      name: 'islem',
      score: 10,
      id: 9,
      highScore: false,
    },

    {
      name: 'moh',
      score: 4,
      id: 10,
      highScore: false,
    },
  ]

  const classes = useStyles()

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))
  const width = '2000'
  const height = '2080'

  return (
    <Container maxWidth="xl" className={classes.main}>
      <Confetti
        width={width}
        height={height}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                Player:
                {players.length}
              </StyledTableCell>
              <StyledTableCell align="right">Score/Trophy&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <StyledTableRow key={player.name}>
                <StyledTableCell component="th" scope="row">
                  <div className={classes.player}>
                    <Stack direction="row" spacing={2}>
                      <Avatar sx={{ bgcolor: deepOrange[500] }}>{player.name.substr(0, 1)}</Avatar>
                      {player.name}
                    </Stack>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {player.score}
                  <svg viewBox="0 0 44 35" className={player.highScore ? classes.isHighScore : classes.isNotHighScore}>
                    <path d="M26.7616 10.6207L21.8192 0L16.9973 10.5603C15.3699 14.1207 10.9096 15.2672 7.77534 12.9741L0 7.24138L6.56986 28.8448H37.0685L43.5781 7.72414L35.7425 13.0948C32.6685 15.2672 28.3288 14.0603 26.7616 10.6207Z" transform="translate(0 0.301727)" />
                    <rect width="30.4986" height="3.07759" transform="translate(6.56987 31.5603)" />
                  </svg>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ScoreBoard
