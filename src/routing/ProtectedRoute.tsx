import React, { FC } from "react";
import { RouteProps, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

interface Props extends RouteProps {
  component: React.FC;
}

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state: any) => state.authReducer.isAuthenticated);
  const loading = useSelector((state: any) => state.authReducer.loading);

  if (!localStorage.token || !isAuthenticated) {
    return <Navigate to="articles" />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
