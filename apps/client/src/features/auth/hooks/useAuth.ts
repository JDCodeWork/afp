import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { checkingStatus, clearError, login, logout } from '../store'
import { authApi } from '../api'
import { useTranslation } from 'react-i18next'
import { AuthResponse, ErrorResponse } from '../interfaces'
import { LoginSchema, RegisterSchema } from '../schemas/auth-schema'
import axios from 'axios'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const useAuth = () => {
  const authState = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const [t] = useTranslation('auth')
  const [tGlobal] = useTranslation('global')

  const checkSession = async () => {
    const { user } = authState

    dispatch(checkingStatus())

    if (!user) return dispatch(logout())

    const { data } = await authApi('/check', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })

    if (data.ok) {
      dispatch(login(user))
    } else {
      dispatch(logout(t('errors.token-expired')))
    }
  }

  const handleRegister = async (user: Omit<RegisterSchema, 'remember'>) => {
    dispatch(checkingStatus())

    try {
      const { data } = await authApi.post<AuthResponse>('/register', user)

      dispatch(login(data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(logout((error.response?.data as ErrorResponse).message))
      } else {
        dispatch(logout(tGlobal('unexpected-error')))
      }
    }
  }

  const handleLogin = async (user: Omit<LoginSchema, 'remember'>) => {
    dispatch(checkingStatus())

    await sleep(5000)

    try {
      const { data } = await authApi.post<AuthResponse>('/', user)

      dispatch(login(data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(logout((error.response?.data as ErrorResponse).message))
      } else {
        dispatch(logout(tGlobal('unexpected-error')))
      }
    }
  }

  const handleClearError = () => {
    dispatch(clearError())
  }

  return {
    authState,
    checkSession,
    handleRegister,
    handleLogin,
    handleClearError,
  }
}
