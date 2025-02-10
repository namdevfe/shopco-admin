import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import InputField from '~/components/InputField'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { AddRolePayload } from '~/types/role'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CircularProgress from '@mui/material/CircularProgress'

interface RoleDialogProps {
  isOpen?: boolean
  isLoading?: boolean
  onClose?: () => void
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (payload: AddRolePayload) => void
}

const RoleDialog = ({
  isOpen = false,
  isLoading = false,
  onClose,
  onSubmit
}: RoleDialogProps) => {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string()
  })

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '',
      description: ''
    },
    resolver: yupResolver(schema)
  })

  const _onSubmit = (data: AddRolePayload) => {
    onSubmit?.(data)
    reset()
  }

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose}>
      {isLoading && <CircularProgress />}
      <DialogTitle>Add new role</DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit(_onSubmit)}>
          <InputField name='name' label='Name' control={control} />
          <InputField
            name='description'
            label='Description'
            control={control}
          />

          <Button type='submit' variant='contained'>
            Add
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default RoleDialog
