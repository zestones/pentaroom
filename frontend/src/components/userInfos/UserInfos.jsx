import React from 'react'
import { makeStyles } from '@mui/styles'
import Tooltip from '@mui/material/Tooltip'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import clsx from 'clsx'

const useStyles = makeStyles({
  userInfos: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px',
  },
  userStatus: {
    margin: '0 5px',
  },
  status: {
    width: '15px',
    height: '15px',
    borderRadius: '100%',
    backgroundColor: 'red',
    '&.connected': {
      backgroundColor: 'green',
    },
  },
  userRole: {
    margin: '0 5px',
  },
  icon: {
    color: 'black',
  },
})

function UserInfos({ username, isConnected }) {
  const getStatusStr = () => ((isConnected) ? 'Connecté' : 'Non connecté')
  const classes = useStyles()

  return (
    <div className={classes.userInfos}>
      <div className={classes.userStatus}>
        <Tooltip title={getStatusStr()}>
          <div className={clsx(classes.status, isConnected && 'connected')} />
        </Tooltip>
      </div>
      <h2>{username}</h2>

      <div className={classes.userRole}>
        <AccountCircleIcon fontSize="medium" className={classes.icon} />
      </div>

    </div>
  )
}

export default UserInfos
