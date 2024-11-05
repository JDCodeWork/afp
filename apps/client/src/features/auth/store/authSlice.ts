import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthResponse, AuthState } from '../interfaces'
import { loadAuthState } from '../utils/loadAuthState'

const initialState: AuthState = loadAuthState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.message = undefined
    },
    checkingStatus: (state) => {
      state.status = 'checking'
    },
    login: (_, action: PayloadAction<AuthResponse>) => ({
      user: action.payload,
      status: 'authenticated',
    }),
    logout: (_, action: PayloadAction<string | undefined>) => ({
      status: 'not-authenticated',
      message: action?.payload,
    }),
  },
})

export const { clearError, checkingStatus, login, logout } = authSlice.actions

export const authReducer = authSlice.reducer
