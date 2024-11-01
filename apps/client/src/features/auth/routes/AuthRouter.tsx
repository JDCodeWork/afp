import { RouteObject } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"

export const AuthRouter: RouteObject = {
  path: '/auth',
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
