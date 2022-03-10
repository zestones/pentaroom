/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { makeStyles } from '@mui/styles'
import Tooltip from '@mui/material/Tooltip'
import clsx from 'clsx'
import Avatar from 'react-nice-avatar'

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
    width: '3rem',
    height: '3rem',
    border: '2px solid black',
  },
})

function UserInfos({ username, isConnected, myAvatar }) {
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
        <Avatar fontSize="medium" className={classes.icon} {...myAvatar} />
      </div>

    </div>
  )
}

export default UserInfos
