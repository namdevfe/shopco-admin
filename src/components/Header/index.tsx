import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import ModeSelect from '~/components/ModeSelect'

const Header = () => {
  return (
    <Box component='header' sx={{ height: '60px' }}>
      <Container sx={{ height: '100%' }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ width: '100%', height: '100%' }}
        >
          <Box>Left</Box>
          <Stack direction='row' gap={2}>
            {/* Mode Select */}
            <ModeSelect />

            {/* Account */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <Avatar alt='Avatar' sx={{ width: '32px', height: '32px' }}>
                N
              </Avatar>
              <ArrowDropDownIcon />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Header
