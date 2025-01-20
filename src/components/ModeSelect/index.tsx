import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'

const ModeSelect = () => {
  const { mode, setMode } = useColorScheme()

  if (!mode) {
    return null
  }

  const handleModeChange = (e: SelectChangeEvent) => {
    setMode(e.target.value as 'system' | 'light' | 'dark')
  }

  return (
    <FormControl sx={{ minWidth: 140 }} size='small'>
      <InputLabel id='mode-select-small-label'>Select Mode</InputLabel>
      <Select
        labelId='mode-select-small-label'
        id='mode-select-small'
        value={mode}
        label='Select Mode'
        onChange={handleModeChange}
      >
        <MenuItem value='light'>Light</MenuItem>
        <MenuItem value='dark'>Dark</MenuItem>
        <MenuItem value='system'>System</MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
