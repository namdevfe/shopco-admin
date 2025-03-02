import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import TableComponent, { ColumnProps } from '~/components/TableComponent'
import { useEffect, useState } from 'react'
import permissionService from '~/services/permissionService'
import { Permission } from '~/types/permission'

const PERMISSION_COLUMNS: ColumnProps[] = [
  {
    label: 'ID',
    name: '_id'
  },
  {
    label: 'URL Endpoint',
    name: 'url'
  },
  {
    label: 'Description',
    name: 'description'
  }
]

const PermissionPage = () => {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const handleGetPermissions = async () => {
      setLoading(true)
      try {
        const res = await permissionService.getAll()

        if (res.data.length > 0) {
          setPermissions(res.data)
        }
      } catch (error) {
        console.log('🚀error---->', error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 300)
      }
    }

    handleGetPermissions()
  }, [])

  return (
    <Container>
      <Stack
        direction='row'
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Box>
          <Typography variant='h4' component='h1' gutterBottom>
            Permissions
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            Create permission to assign for role...
          </Typography>
        </Box>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {}}
          startIcon={<AddIcon />}
        >
          Add new permission
        </Button>
      </Stack>

      <TableComponent
        sx={{ marginTop: 4 }}
        loading={loading}
        columns={PERMISSION_COLUMNS}
        data={permissions || []}
      />
    </Container>
  )
}

export default PermissionPage
