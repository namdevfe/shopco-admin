import DashboardIcon from '@mui/icons-material/Dashboard'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SIDEBAR_MENUS = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon color='primary' />,
    path: '/'
  },
  {
    text: 'Roles',
    icon: <VerifiedUserIcon color='primary' />,
    path: '/roles'
  }
]

const Sidebar = () => {
  const navigate = useNavigate()
  const [menuSelected, setMenuSelected] = useState<string>('/')

  const handleMenuItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    itemLink: string
  ) => {
    e.stopPropagation()
    setMenuSelected(itemLink)
  }

  const DrawerList = (
    <Box sx={{ width: 250 }}>
      <Box>Logo</Box>
      <List>
        {SIDEBAR_MENUS.map(({ text, icon, path }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={path === menuSelected}
              onClick={(e) => {
                navigate(path)
                handleMenuItemClick(e, path)
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Drawer variant='permanent' open={true}>
      {DrawerList}
    </Drawer>
  )
}

export default Sidebar
