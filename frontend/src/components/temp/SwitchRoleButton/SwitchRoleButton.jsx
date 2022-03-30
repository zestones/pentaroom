import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import './SwitchRoleButton.scss'

import { SocketContext } from '../../../context/socket'

function SwitchRoleButton({ isChallenged, setIsChallenged }) {
  const socket = useContext(SocketContext)

  const handleClick = () => {
    if (!isChallenged) {
      socket.emit('update-drawer')
    } else {
      setIsChallenged(false)
      socket.emit('update-drawer')
    }
  }

  return (
    <Button variant="contained" className="switch-role-btn" onClick={handleClick}>{isChallenged ? 'Passer spectateur' : 'Passer dessinateur'}</Button>
  )
}

export default SwitchRoleButton
