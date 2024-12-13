import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { checkingStatus, clearError, login, logout } from '../store'
import { authApi } from '../api'
import { useTranslation } from 'react-i18next'
import { AuthResponse, ErrorResponse } from '../interfaces'
import { LoginFormInputs, RegisterFormInputs } from '../schemas/auth-schema'
import axios from 'axios'

export const useAuth = () => {
  const authState = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const [t] = useTranslation('auth')
  const [tGlobal] = useTranslation('global')

  const checkSession = async () => {
    const { user } = authState

    dispatch(checkingStatus())

    if (!user) return dispatch(logout())
    
    try {
      const { data } = await authApi('/check', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      if (!data.ok) {
        return logout(tGlobal('unexpected-error'))
      }

      dispatch(login(user))
    } catch (e) {
      console.log('e', e)
      dispatch(logout(t('errors.token-expired')))
    }
  }

  const handleRegister = async (user: Omit<RegisterFormInputs, 'remember'>) => {
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

  const handleLogin = async (user: Omit<LoginFormInputs, 'remember'>) => {
    dispatch(checkingStatus())

    try {
      const { data } = await authApi.post<AuthResponse>('/', user)

      dispatch(login(data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(logout((error.response?.data as ErrorResponse)?.message || tGlobal('unexpected-error')))
      } else {
        dispatch(logout())
      }
    }
  }

  const handleClearError = () => {
    dispatch(clearError())
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return {
    authState,
    checkSession,
    handleRegister,
    handleLogin,
    handleLogout,
    handleClearError
  }
}
