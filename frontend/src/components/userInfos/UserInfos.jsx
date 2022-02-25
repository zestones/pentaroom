import React from 'react'

function UserInfos({ userRole, isConnected }) {
  const getStatusStr = () => ((isConnected) ? 'Connecté.' : 'Non connecté.')
  return (
    <div className="user-infos">
      <div className="user-role">
        Role:
        {' '}
        { userRole }
      </div>
      <div className="status">
        Status :
        {' '}
        { getStatusStr() }
      </div>

    </div>
  )
}

export default UserInfos
