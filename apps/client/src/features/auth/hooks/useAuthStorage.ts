import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { onLogin } from '../store'

export const useAuthStorage = () => {
  const authState = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    dispatch(onLogin())
  }

  return { authState, handleLogin }
}
