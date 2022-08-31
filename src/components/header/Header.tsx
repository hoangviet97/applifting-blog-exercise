import React from "react";
import PublicNavigation from "../navigation/PublicNavigation";
import HeaderAuth from "./HeaderAuth";

const Header: React.FunctionComponent = () => {
  return (
    <div className="header">
      <div className="header__content container">
        <PublicNavigation />
        <HeaderAuth />
      </div>
    </div>
  );
};

export default Header;
