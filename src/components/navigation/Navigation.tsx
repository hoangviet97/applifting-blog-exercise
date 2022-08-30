import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/recent">Recent </Link>
        </li>
        <li>
          <Link to="">About </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
