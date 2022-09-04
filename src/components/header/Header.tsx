import React from "react";
import PublicNavigation from "../navigation/PublicNavigation";
import HeaderAuth from "./HeaderAuth";

const Header: React.FunctionComponent = () => {
  return (
    <div className="header">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
        <PublicNavigation />
        <HeaderAuth />
      </div>
    </div>
  );
};

export default Header;
