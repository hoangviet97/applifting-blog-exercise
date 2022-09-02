import React, { FC } from "react";
import { RouteProps, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import FullPageLoader from "../components/Skeletons/FullPageLoader";

interface Props extends RouteProps {
  children: any;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuthenticated = useSelector((state: any) => state.authReducer.isAuthenticated);
  const loading = useSelector((state: any) => state.authReducer.loading);

  if (!localStorage.token) {
    return <Navigate to="/articles" />;
  }

  return children;
};

export default ProtectedRoute;
