import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "antd";

const PrivateNavigation: React.FunctionComponent = () => {
  const user = useSelector((state: any) => state.authReducer.user);
  return (
    <div className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link to="/recent-articles" className="nav__link">
            My Articles
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/new-article" className="nav__link">
            Create Article
          </Link>
        </li>
      </ul>
      <Avatar shape="circle" style={{ backgroundColor: "#87d068" }}>
        {user[0]}
      </Avatar>
    </div>
  );
};

export default PrivateNavigation;
