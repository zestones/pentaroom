import React from 'react'
import clsx from 'clsx'
import styles from './Timer.module.scss'

function Timer({ time }) {
  const classes = () => {
    if (time === -1) return ''
    if (time < 10) return styles.danger
    if (time < 30) return styles.warning
    return ''
  }

  const timeToMin = () => {
    if (time < 60) return time
    const minutes = Math.floor(time / 60)
    return `${minutes} ' ${time - 60 * minutes}`
  }

  return (
    <p className={clsx(styles.timer, classes())}>
      <span className={styles.time}>{time !== -1 ? `${timeToMin()}` : ''}</span>
    </p>
  )
}
export default Timer
