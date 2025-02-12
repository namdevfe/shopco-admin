import { Role } from '~/types/role'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

interface RoleTableProps {
  roles: Role[]
  onEdit?: (role: Role) => void
  onRemove?: (role: Role) => void
}

const RoleTable = ({ roles = [], onEdit, onRemove }: RoleTableProps) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((item, index) => (
              <TableRow key={item._id || index}>
                <TableCell component='th' scope='row'>
                  {item._id}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}
                  >
                    <Button
                      color='primary'
                      size='small'
                      onClick={() => onEdit?.(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      color='error'
                      size='small'
                      onClick={() => onRemove?.(item)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default RoleTable
