import React from 'react'
import Button from '@mui/material/Button'
import './SwitchRoleButton.scss'

function SwitchRoleButton({ isChallenged, setIsChallenged }) {
  const handleClick = () => {
    setIsChallenged(!isChallenged)
  }

  return (
    <Button variant="contained" className="switch-role-btn" onClick={handleClick}>{isChallenged ? 'Passer spectateur' : 'Passer dessinateur'}</Button>
  )
}

export default SwitchRoleButton
