import { useAuthStorage } from "@/features/auth"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedLayout = () => {
  const { authState } = useAuthStorage()

  return (
    authState.token
      ? <Outlet />
      : <Navigate to='/auth' />
  )
}
