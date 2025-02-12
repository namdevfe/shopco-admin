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
import { PaginationTypes } from '~/types/common'
import { AddRolePayload, Role } from '~/types/role'

const RolePage = () => {
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [, setIsFetching] = useState<boolean>(true)
  const [roles, setRoles] = useState<Role[]>([])
  const [pagination, setPagination] = useState<PaginationTypes | null>(null)
  const [filters, setFilters] = useState<any>({
    page: 1,
    limit: 3
  })

  const handleShowDialog = () => {
    setIsShowDialog(true)
  }

  const handleCloseDialog = () => {
    setIsShowDialog(false)
  }

  const handleAddRole = async (payload: AddRolePayload) => {
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
        setTimeout(() => {
          setIsFetching(false)
        }, 300)
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

          <RoleTable roles={roles} />
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
        onClose={handleCloseDialog}
        onSubmit={handleAddRole}
      />
    </>
  )
}

export default RolePage
