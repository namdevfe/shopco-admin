import { ApiResponse } from '~/types/common'
import { AddRolePayload, Role } from '~/types/role'
import axiosInstance from '~/utils/axiosInstance'

const roleService = {
  addRole(payload: AddRolePayload): Promise<ApiResponse<Role>> {
    return axiosInstance.post('/roles/add-role', payload)
  }
}

export default roleService
