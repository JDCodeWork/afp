import axios from 'axios'

export const authApi = axios.create({
  baseURL: 'http://localhost:5173/api/auth'
})
