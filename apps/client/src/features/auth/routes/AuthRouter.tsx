import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"
import { AuthLayout } from "../layouts"

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/*" element={<Navigate to='/auth' />} />
      </Route>
    </Routes>
  )
}
