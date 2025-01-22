import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LoginForm from '~/pages/Auth/LoginPage/LoginForm'
import { LoginPayLoad } from '~/types/auth'
import { useState } from 'react'
import authService from '~/services/authService'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async (payload: LoginPayLoad) => {
    setLoading(true)
    try {
      const res = await authService.login(payload)

      if (res.statusCode === 200 && res.data) {
        // Notification
        toast.success(res.message)
      }
    } catch (error) {
      console.log('🚀error---->', error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }

  return (
    <Card sx={{ minWidth: 460 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant='h1' sx={(theme) => theme.typography.h3}>
            Login
          </Typography>
        </Box>

        <LoginForm loading={loading} onSubmit={handleLogin} />
      </CardContent>
    </Card>
  )
}

export default LoginPage
