import Box from '@mui/material/Box'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '~/store'

const AuthLayout = () => {
  const { token } = useAppSelector((state) => state.auth)
  if (token) {
    return <Navigate to='/' />
  }

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
