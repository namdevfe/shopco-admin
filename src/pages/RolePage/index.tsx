import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import RoleDialog from '~/pages/RolePage/RoleDialog'
import RoleTable from '~/pages/RolePage/RoleTable'
import roleService from '~/services/roleService'
import { ListParams, PaginationTypes } from '~/types/common'
import { Role } from '~/types/role'

const RolePage = () => {
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [, setIsFetching] = useState<boolean>(true)
  const [roles, setRoles] = useState<Role[]>([])
  const [pagination, setPagination] = useState<PaginationTypes | null>(null)
  const [filters, setFilters] = useState<ListParams>({
    page: 1,
    limit: 3
  })
  const [selectedRole, setSelectedRole] = useState<Role>()

  const handleShowDialog = () => {
    setIsShowDialog(true)
  }

  const handleCloseDialog = () => {
    setIsShowDialog(false)
  }

  const handleAddRole = async (payload: any) => {
    setIsLoading(true)
    try {
      const res = await roleService.addRole(payload)
      if (res.data._id) {
        toast.success(res.message)
        handleCloseDialog()
      }
    } catch (error) {
      console.log('🚀error---->', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    e.stopPropagation()
    setFilters({ ...filters, page })
  }

  const handleSelectRole = (role: Role) => {
    handleShowDialog()
    setSelectedRole(role)
  }

  const handleEditRole = async (payload: any) => {
    if (selectedRole?._id) {
      setIsLoading(true)
      try {
        const res = await roleService.editRoleById(selectedRole._id, payload)
        if (res.data) {
          toast.success(res.message)
          const { _id, name, description, permission } = res.data || {}
          const index = roles.findIndex((role) => role._id === _id)
          roles[index].name = name
          roles[index].description = description
          roles[index].permission = permission
          handleCloseDialog()
        }
      } catch (error) {
        console.log('🚀fetch role has error---->', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      setIsFetching(true)
      try {
        const res = await roleService.getRoles(filters)
        if (res.data.roles.length > 0) {
          setRoles(res.data.roles)

          if (res.data.pagination) {
            setPagination(res.data.pagination)
          }
        }
      } catch (error) {
        console.log('Fetch roles has error: ', error)
      } finally {
        setIsFetching(false)
      }
    })()
  }, [filters])

  return (
    <>
      <Box component='main'>
        <Container>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 4
            }}
          >
            <Box>
              <Typography variant='h4' gutterBottom>
                Roles
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Create roles to assign for user account
              </Typography>
            </Box>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleShowDialog()}
              startIcon={<AddIcon />}
            >
              Add new role
            </Button>
          </Box>

          <RoleTable roles={roles} onEdit={handleSelectRole} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 2
            }}
          >
            <Pagination
              color='primary'
              count={pagination?.totalPages}
              onChange={handlePageChange}
            />
          </Box>
        </Container>
      </Box>

      <RoleDialog
        isOpen={isShowDialog}
        isLoading={isLoading}
        role={selectedRole}
        onClose={handleCloseDialog}
        onSubmit={selectedRole ? handleEditRole : handleAddRole}
      />
    </>
  )
}

export default RolePage
