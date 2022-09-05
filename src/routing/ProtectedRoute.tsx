import { FC } from "react";
import { RouteProps, Navigate } from "react-router-dom";

interface Props extends RouteProps {
  children: any;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  if (!localStorage.token) {
    return <Navigate to="/articles" />;
  }

  return children;
};

export default ProtectedRoute;
