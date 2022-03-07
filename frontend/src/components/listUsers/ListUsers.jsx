import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  button: {
    width: '100%',
    height: '50px',
  },
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 24,
    padding: '15px',
  },
  listUsers: {
    listStyle: 'none',
    padding: '20px 0',
    margin: '0',
    textAlign: 'center',
  },
  currentUser: {
    color: 'purple',
  },
})

function ListUsers({ users, userID }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const classes = useStyles()

  const getNumberUser = () => users.filter((user) => user.pseudo !== '').length

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        Utilsateurs :
        {' '}
        {getNumberUser()}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-users"
        aria-describedby="modal-users"
      >
        <Box className={classes.box}>
          <ul className={classes.listUsers}>
            {users.map((user) => (
              <li className={user.id === userID && classes.currentUser} key={user.id}>
                {user.pseudo}

              </li>
            ))}
          </ul>
        </Box>
      </Modal>
    </div>
  )
}

export default ListUsers
