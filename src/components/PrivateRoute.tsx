import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

export default function PrivateRoute(): JSX.Element {
  const { checkingStatus, loggedIn } = useAuthStatus();
  console.log(checkingStatus, loggedIn);

  if (checkingStatus) {
    return <h3>Loading...</h3>;
  }
  //if user is logged in, then return eveything inside this private route
  //else redriect the unauthenticated to the sign in page
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
