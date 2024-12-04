import { Outlet } from "react-router-dom"
import { Sidebar } from "./sidebar"
import { Suspense } from "react"

export const ProtectedLayout = () => {
  return (
    <Sidebar>
      <Suspense fallback={<p>Cargando...</p>}>
        <Outlet />
      </Suspense>
    </Sidebar>
  )
}
