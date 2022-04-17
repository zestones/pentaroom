import React, { useContext, useState, useEffect } from 'react'
import styles from './ChosenWord.module.scss'

import { SocketContext } from '../../../context/socket'

function ChosenWord() {
  const socket = useContext(SocketContext)

  const [word, setWord] = useState('aucun mot')
  const [hiddenWord, setHiddenWord] = useState('aucun mot')
  useEffect(() => {
    socket.on('temp-chosen-word', (newWord) => {
      setWord(newWord)
      let newHiddenWord = ''
      for (let i = 0; i < newWord.length; i += 1) {
        newHiddenWord += '-'
      }
      setHiddenWord(newHiddenWord)
    })
    socket.on('discover-letter', (index) => {
      let newHiddenWord = ''
      for (let i = 0; i < hiddenWord.length; i += 1) {
        if (i === index) {
          newHiddenWord += word[index]
        } else {
          newHiddenWord += hiddenWord[i]
        }
      }
      setHiddenWord(newHiddenWord)
    })
  })

  return (
    <h2 className={styles.word}>
      {hiddenWord}
    </h2>
  )
}

export default ChosenWord
