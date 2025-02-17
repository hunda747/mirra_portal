import { FC, PropsWithChildren } from "react";

import { Navigate, useLocation } from "react-router";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem("access_token");
  const signedIn = accessToken?.length ? true : false;

  return signedIn ? (
    children
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
