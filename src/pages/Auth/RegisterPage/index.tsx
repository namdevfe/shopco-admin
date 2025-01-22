import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
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
            Register
          </Typography>
        </Box>

        {/* Login Form */}
        <Box component='form' autoComplete='off' noValidate sx={{ mt: 4 }}>
          <Stack gap={2}>
            <TextField
              type='text'
              label='Email'
              placeholder='Enter your email...'
              required
              // size='small'
            />
            <TextField
              type='password'
              label='Password'
              placeholder='Enter your password...'
              required
              // size='small'
            />
          </Stack>

          <Stack mt={3}>
            <Button type='submit' variant='contained' size='large'>
              Register
            </Button>
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              gap={1}
              mt={2}
            >
              <Typography variant='body2'>Already have account?</Typography>
              <Link to='/login'>Login</Link>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RegisterPage
