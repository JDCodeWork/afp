import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardRouter } from "../dashboard/routes"
import { ProtectedLayout } from "@/shared"

export const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route index element={<DashboardRouter />} />

        <Route path="/*" element={<Navigate to='/' />} />
      </Route>
    </Routes>
  )
}
