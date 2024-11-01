import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  name?: string
  token?: string
}

const initialState: AuthState = {}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: () => ({
      name: 'some user',
      token: 'someToken',
    }),
  },
})

export const { onLogin } = authSlice.actions

export const authReducer = authSlice.reducer
