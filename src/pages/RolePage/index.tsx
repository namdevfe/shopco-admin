import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import RoleDialog from '~/pages/RolePage/RoleDialog'
import RoleTable from '~/pages/RolePage/RoleTable'
import roleService from '~/services/roleService'
import { ListParams, PaginationTypes } from '~/types/common'
import { Role } from '~/types/role'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

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
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false)

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false)
  }

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true)
  }

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
        // handleGetRoles()
        setFilters({ ...filters, page: 1 })
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

  const handleShowDeleteConfirmRole = (role: Role) => {
    setSelectedRole(role)
    handleOpenConfirmDialog()
  }

  const handleDeleteRole = async () => {
    if (selectedRole?._id) {
      setIsLoading(true)
      try {
        const res = await roleService.deleteRoleById(selectedRole._id)
        if (res.data) {
          toast.success(res.message)
          handleCloseConfirmDialog()
          setFilters({ ...filters, page: 1 })
          // handleGetRoles()
        }
      } catch (error: any) {
        toast.error('Delete role is failed.', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleGetRoles = useCallback(async () => {
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
  }, [filters])

  useEffect(() => {
    handleGetRoles()
  }, [handleGetRoles])

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

          <RoleTable
            roles={roles}
            onEdit={handleSelectRole}
            onRemove={handleShowDeleteConfirmRole}
          />
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
              page={pagination?.currentPage || 1}
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

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Confirm delete role</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure want delete this role?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Disagree</Button>
          <Button
            onClick={() => {
              handleDeleteRole()
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RolePage
