import React from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'

import './Option.scss'

function Option({
  handleClick, setConfig, id, children,
}) {
  return (
    <List
      className="list"
    >
      <List component="div" disablePadding className="test">
        <ListItemButton onClick={() => handleClick()}>
          {children}
        </ListItemButton>
        <ListItemButton>
          <input
            type="color"
            onChange={(e) => setConfig((prevData) => ({
              ...prevData,
              [id]: e.target.value,
            }))}
          />
        </ListItemButton>
      </List>
    </List>
  )
}

export default Option
