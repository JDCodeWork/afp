import { Route, Routes } from "react-router-dom"
import { DashboardLayout } from "../layouts/DashboardLayout"

const DashboardRouter = () => {
  return (
    <Routes>
      <Route index element={<DashboardLayout />} />
    </Routes>
  )
}

export default DashboardRouter