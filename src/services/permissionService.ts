import { ApiResponse } from '~/types/common'
import { Permission } from '~/types/permission'
import axiosInstance from '~/utils/axiosInstance'

const permissionService = {
  getAll(): Promise<ApiResponse<Permission[]>> {
    const url = '/permissions/get-all-permissions'
    return axiosInstance.get(url)
  }
}

export default permissionService
