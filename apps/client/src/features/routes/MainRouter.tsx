import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthRouter } from '../auth'
import { ProtectedLayout } from '@/shared/components'
import { ProtectedRoutes } from './ProtectedRoutes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />,
    children: ProtectedRoutes
  },
  AuthRouter,
  {
    path: '/*',
    element: <Navigate to='/' />
  }
])
