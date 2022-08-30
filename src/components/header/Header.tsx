import React from "react";
import Navigation from "../navigation/Navigation";
import HeaderAuth from "./HeaderAuth";

const Header = () => {
  return (
    <div className="header container">
      <Navigation />
      <HeaderAuth />
    </div>
  );
};

export default Header;
