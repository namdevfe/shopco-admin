import { LoginPayLoad, LoginResponse } from '~/types/auth'
import { ApiResponse } from '~/types/common'
import axiosInstance from '~/utils/axiosInstance'

const authService = {
  login(payload: LoginPayLoad): Promise<ApiResponse<LoginResponse>> {
    return axiosInstance.post('/auth/login', payload)
  }
}

export default authService
