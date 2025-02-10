import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import RoleDialog from '~/pages/RolePage/RoleDialog'
import { AddRolePayload } from '~/types/role'
import roleService from '~/services/roleService'
import { toast } from 'react-toastify'

const RolePage = () => {
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  return (
    <>
      <Box component='main'>
        <Container>
          {/* Textbox */}
          {/* <Box>
          <Typography
            variant='h1'
            gutterBottom
            sx={(theme) => theme.typography.h3}
          >
            Roles
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            Create roles to assign for user account
          </Typography>
        </Box> */}

          {/* Actions */}
          <Box>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={handleShowDialog}
            >
              Add new role
            </Button>
          </Box>

          {/* Table */}
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
