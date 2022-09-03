import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../logo.png";

const PublicNavigation: React.FunctionComponent = () => {
  return (
    <div className="nav">
      <div className="nav__icon">
        <Link to="/">
          <img src={Logo} alt="logo" width={39} height={44} style={{ lineHeight: "44px" }} />
        </Link>
      </div>
      <div className="nav__list">
        <Link to="/articles" className="nav__link">
          Recent Articles
        </Link>

        <Link to="" className="nav__link">
          About
        </Link>
      </div>
    </div>
  );
};

export default PublicNavigation;
