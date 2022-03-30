import React from 'react'
import Button from '@mui/material/Button'
import './SwitchRoleButton.scss'

function SwitchRoleButton({ isChallenged, setIsChallenged, setWords }) {
  const handleClick = () => {
    setIsChallenged(!isChallenged)
    setWords(['mot 1', 'mot 2', 'mot 3'])
  }
  return (
    <Button variant="contained" className="switch-role-btn" onClick={handleClick}>{isChallenged ? 'Passer spectateur' : 'Passer dessinateur'}</Button>
  )
}

export default SwitchRoleButton
