import { AppRouter } from "@/features/routes"
import { BrowserRouter } from "react-router-dom"

export const ReactRouterProvider = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
