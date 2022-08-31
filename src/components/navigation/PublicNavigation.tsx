import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../logo.png";

const PublicNavigation: React.FunctionComponent = () => {
  return (
    <div className="nav">
      <div className="nav__icon">
        <Link to="/">
          <img src={Logo} alt="logo" width={39} height={44} />
        </Link>
      </div>
      <ul className="nav__list">
        <li className="nav__item">
          <Link to="/recent-articles" className="nav__link">
            Recent Articles
          </Link>
        </li>
        <li className="nav__item">
          <Link to="" className="nav__link">
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default PublicNavigation;
