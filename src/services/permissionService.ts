import { ApiResponse } from '~/types/common'
import { AddPermissionPayload, Permission } from '~/types/permission'
import axiosInstance from '~/utils/axiosInstance'

const permissionService = {
  getAll(): Promise<ApiResponse<Permission[]>> {
    const url = '/permissions/get-all-permissions'
    return axiosInstance.get(url)
  },
  add(payload: AddPermissionPayload): Promise<ApiResponse<Permission>> {
    const url = '/permissions/add-permission'
    return axiosInstance.post(url, payload)
  }
}

export default permissionService
