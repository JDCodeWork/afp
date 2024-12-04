import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth, AuthRouter } from "../auth";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { toast } from "sonner";
import { Loader } from "../auth/components/Loader";

export const AppRouter = () => {
  const { authState, checkSession, handleClearError } = useAuth()

  useEffect(() => {
    if (authState.status != "not-authenticated") {
      checkSession()
    }
  }, []);

  useEffect(() => {
    if (authState.message && authState.message.length > 1) {
      toast.error(authState.message)
      handleClearError()
    }
  }, [authState.message]);


  return authState.status == "checking"
    ? (
      <Loader />
    )
    : (
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
