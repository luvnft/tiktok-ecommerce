import axios from 'axios'
import { ApiRes } from '@/types/common'
import { getToken } from '@/lib/utils'

const axiosInstance = axios.create({})

axiosInstance.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use((response) => {
  const data: ApiRes<any> = response.data
  if (data.resultcode === 403) {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
    }
    window.location.href = '/login'
  }
  if (400 <= data.resultcode && data.resultcode < 500) {
    throw new Error(data.resultmessage)
  }
  return response
})

export default axiosInstance
