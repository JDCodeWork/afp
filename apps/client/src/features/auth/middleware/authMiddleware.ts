import { Action, Middleware } from '@reduxjs/toolkit'
import { AppState } from '../../../shared/store'

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action)

  if ((action as Action).type === 'auth/login' || (action as Action).type === 'auth/logout') {
    const state = store.getState() as AppState
    const authState = state.auth

    // Guardamos el estado de auth en sessionStorage
    sessionStorage.setItem('auth', JSON.stringify(authState))
  }

  return result
}
