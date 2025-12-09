import axiosInstance from '@/config/axios'

export function loginApi(data) {
  return axiosInstance.post('/login', data)
}

export function logoutApi() {
  return axiosInstance.post('/logout')
}