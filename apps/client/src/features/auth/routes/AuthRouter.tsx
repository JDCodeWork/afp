import { RouteObject } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"
import { AuthLayout } from "../layouts"

export const AuthRouter: RouteObject = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      path: '',
      element: <LoginPage />
    },
    {
      path: 'register',
      element: <RegisterPage />
    },
  ]
}
