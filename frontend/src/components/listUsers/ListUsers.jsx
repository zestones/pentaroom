import React from 'react'

function ListUsers({ users }) {
  return (
    <div className="list-users">
      <h2>Liste des utilisateurs actuels : </h2>
      <ul>
        {users.map((user) => (
          <li key={user}>{user.id}</li>
        ))}
      </ul>
    </div>
  )
}

export default ListUsers
