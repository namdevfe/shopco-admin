import { ApiResponse, ListParams } from '~/types/common'
import { AddRolePayload, Role, EditRolePayload } from '~/types/role'
import axiosInstance from '~/utils/axiosInstance'

const roleService = {
  addRole(payload: AddRolePayload): Promise<ApiResponse<Role>> {
    return axiosInstance.post('/roles/add-role', payload)
  },
  getRoles(params: ListParams): Promise<
    ApiResponse<{
      roles: Role[]
      pagination: {
        currentPage: number
        limit: number
        total: number
        totalPages: number
      }
    }>
  > {
    return axiosInstance.get('/roles/get-roles', {
      params
    })
  },
  editRoleById(
    id: string,
    payload: EditRolePayload
  ): Promise<ApiResponse<Role>> {
    return axiosInstance.put(`/roles/edit-role/${id}`, payload)
  }
}

export default roleService
