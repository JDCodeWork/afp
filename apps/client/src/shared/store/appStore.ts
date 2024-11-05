import { configureStore } from '@reduxjs/toolkit'

import { authReducer, authMiddleware } from '@/features/auth'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
