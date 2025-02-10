import Paper from '@mui/material/Paper'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Role } from '~/types/role'

interface RoleTableProps {
  roles: Role[]
  isLoading?: boolean
}

const RoleTable = ({ roles = [], isLoading = false }: RoleTableProps) => {
  const columns: GridColDef[] = [
    {
      field: '_id',
      headerName: 'ID'
    },
    {
      field: 'name',
      headerName: 'Role name'
    },
    {
      field: 'description',
      headerName: 'Description'
    }
  ]

  const paginationModel = { page: 0, pageSize: 5 }

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        loading={isLoading}
        getRowId={(row: any) => row._id}
        rows={roles}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  )
}

export default RoleTable
