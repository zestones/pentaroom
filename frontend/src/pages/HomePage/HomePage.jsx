import React from 'react'
import '../../App.css'
import { makeStyles } from '@mui/styles'
import Header from './header/Header'
import TransparentContainer from './transparentContainer/TransparentContainer'
import AvatarPicker from './avatarPicker/AvatarPicker'

const useStyles = makeStyles({
  container: {
    margin: '50px auto',
  },
  title: {
    fontSize: '50px',
    margin: '0',
    '-webkit-text-stroke-width': '2px',
    '-webkit-text-stroke-color': 'black',
    letterSpacing: '1px',
  },
  inputName: {
    marginTop: '30px',
    height: '75px',
    width: '100%',
    borderRadius: '50px',
    backgroundColor: '#cce3f6',
    border: '1px solid black',
    padding: '5px 30px',
    fontSize: '30px',
  },
})

function HomePage() {
  const classes = useStyles()
  return (
    <>
      <Header />
      <TransparentContainer backgroundColor="#0000A5" className={classes.container}>
        <h2 className={classes.title}>1.Personnalise ton avatar :</h2>
        <AvatarPicker />
      </TransparentContainer>
      <TransparentContainer backgroundColor="#0000A5" className={classes.container}>
        <h2 className={classes.title}>2.Choisis un pseudo :</h2>
        <input type="text" placeholder="Tape ton pseudo ici ..." className={classes.inputName} />
      </TransparentContainer>
    </>
  )
}
export default HomePage
