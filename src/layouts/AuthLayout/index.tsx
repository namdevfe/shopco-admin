import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <Outlet />
    </Box>
  )
}

export default AuthLayout
