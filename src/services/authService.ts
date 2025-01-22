import {
  LoginPayLoad,
  LoginResponse,
  RegisterPayload,
  RegisterResponse
} from '~/types/auth'
import { ApiResponse } from '~/types/common'
import axiosInstance from '~/utils/axiosInstance'

const authService = {
  login(payload: LoginPayLoad): Promise<ApiResponse<LoginResponse>> {
    return axiosInstance.post('/auth/login', payload)
  },
  register(payload: RegisterPayload): Promise<ApiResponse<RegisterResponse>> {
    return axiosInstance.post('/auth/register', payload)
  }
}

export default authService
