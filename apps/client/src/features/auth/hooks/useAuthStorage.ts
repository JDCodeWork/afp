import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { checkingStatus, login, logout } from '../store'
import { authApi } from '../api'
import { useTranslation } from 'react-i18next'
import { AuthResponse } from '../interfaces'
import { RegisterSchema } from '../schemas/auth-schema'

export const useAuthStorage = () => {
  const authState = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const [t] = useTranslation('auth')

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
    const { data } = await authApi.post<AuthResponse>('/register', user)

    dispatch(login(data))
  }

  // const handleLogin = async (user: Omit<LoginSchema, 'remember'>) => {
  //   const { data } = await authApi.post<AuthResponse>('/', user)

  //   dispatch(onLogin(data))
  // }

  return { authState, checkSession, handleRegister }
}
