import { Navigate, Route, Routes } from "react-router-dom"
import { ProtectedLayout } from "@/shared"
import { lazy } from "react"

const DashboardRouter = lazy(() => import("../dashboard/routes/DashboardRouter"))

export const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route index element={<DashboardRouter />} />

        <Route path="/transactions" element={<p>Transactions</p>} />
        <Route path="/budgets" element={<p>Budgets</p>} />
        <Route path="/pots" element={<p>Pots</p>} />
        <Route path="/bills" element={<p>Bills</p>} />
        <Route path="/*" element={<Navigate to='/' />} />
      </Route>
    </Routes>
  )
}
