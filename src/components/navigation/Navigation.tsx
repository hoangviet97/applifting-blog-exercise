import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../logo.png";

const Navigation = () => {
  return (
    <div className="nav">
      <img src={Logo} alt="logo" width={39} height={44} />
      <ul className="nav__list">
        <li>
          <Link to="/recent">Recent Articles</Link>
        </li>
        <li>
          <Link to="">About </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
