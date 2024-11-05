import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStorage, AuthRouter } from "../auth";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const AppRouter = () => {
  const { authState, checkSession } = useAuthStorage()

  useEffect(() => {
    if (authState.status != "not-authenticated")
      checkSession()
  }, []);

  return (
    <Routes>
      {
        authState.status == 'authenticated'
          ? <Route path="/*" element={<ProtectedRoutes />} />
          : <Route path="/auth/*" element={<AuthRouter />} />
      }
      <Route path="/*" element={<Navigate to='/auth' />} />
    </Routes>
  )

}
