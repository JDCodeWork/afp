import { AuthState } from '../interfaces'

export const loadAuthState = (): AuthState => {
  const storedAuth = sessionStorage.getItem('auth')

  if (storedAuth) {
    return JSON.parse(storedAuth)
  }

  return { status: 'not-authenticated' }
}
