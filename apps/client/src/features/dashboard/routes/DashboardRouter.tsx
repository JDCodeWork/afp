import { Route, Routes } from "react-router-dom"
import { DashboardPage } from "../pages"

export const DashboardRouter = () => {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
    </Routes>
  )
}
