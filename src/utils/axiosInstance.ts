import axios, { AxiosResponse } from 'axios'
import { BASE_URL_API_ENDPOINT } from '~/constants/environment'

const axiosInstance = axios.create({
  baseURL: BASE_URL_API_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status >= 200 && response.status < 300) {
      return response.data
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
