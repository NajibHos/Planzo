import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {

  const { user } = useAuth();

  return (
    user ? <Outlet /> : <Navigate to='/sign-in' />
  )

}

export default PrivateRoute