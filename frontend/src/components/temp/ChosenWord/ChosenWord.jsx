import React, { useContext, useState, useEffect } from 'react'
import styles from './ChosenWord.module.scss'

import { SocketContext } from '../../../context/socket'

function ChosenWord() {
  const socket = useContext(SocketContext)

  const [word, setWord] = useState('aucun mot')
  useEffect(() => {
    socket.on('temp-chosen-word', (newWord) => setWord(newWord))
  }, [])

  return (
    <h2 className={styles.word}>{word}</h2>
  )
}

export default ChosenWord
