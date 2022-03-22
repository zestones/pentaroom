import React from 'react'
import '../../App.css'
import { makeStyles } from '@mui/styles'
import Header from './header/Header'
import TransparentContainer from './transparentContainer/TransparentContainer'
import AvatarPicker from './avatarPicker/AvatarPicker'

const useStyles = makeStyles({
  title: {
    fontSize: '50px',
    margin: '0',
    '-webkit-text-stroke-width': '2px',
    '-webkit-text-stroke-color': 'black',
    letterSpacing: '1px',
  },
})

function HomePage() {
  const classes = useStyles()
  return (
    <>
      <Header />
      <TransparentContainer backgroundColor="#0000A5" className={classes.container}>
        <h2 className={classes.title}>1.Personnalise ton avatar</h2>
        <AvatarPicker />
      </TransparentContainer>
    </>
  )
}
export default HomePage
