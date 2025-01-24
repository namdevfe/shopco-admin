import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoginForm from '~/pages/Auth/LoginPage/LoginForm'
import authService from '~/services/authService'
import { useAppDispatch } from '~/store'
import { setToken } from '~/store/reducers/authReducer'
import { LoginPayLoad } from '~/types/auth'

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = async (payload: LoginPayLoad) => {
    setLoading(true)
    try {
      const res = await authService.login(payload)

      if (res.statusCode === 200 && res.data) {
        // Notification
        toast.success(res.message)
        dispatch(
          setToken({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken
          })
        )

        navigate('/')
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
