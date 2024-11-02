import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <Outlet />
    </div>
  )
}
