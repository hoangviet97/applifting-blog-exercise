import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateNavigation from "../navigation/PrivateNavigation";

const HeaderAuth: React.FunctionComponent = () => {
  const isAuthenticated = useSelector((state: any) => state.authReducer.isAuthenticated);
  return <div className="header__auth">{isAuthenticated ? <PrivateNavigation /> : <Link to="/login">Log In</Link>}</div>;
};

export default HeaderAuth;
