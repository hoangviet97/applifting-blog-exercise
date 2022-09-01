import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Popover, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { logout } from "../../redux/actions/authActions";

const PrivateNavigation: React.FunctionComponent = () => {
  const dispatch = useDispatch<any>();
  const user = useSelector((state: any) => state.authReducer.user);

  const logoutHandle = () => {
    dispatch(logout());
  };

  const content = (
    <div>
      <Button type="text" onClick={logoutHandle}>
        Logout
      </Button>
    </div>
  );

  return (
    <div className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link to="/my-articles" className="nav__link">
            My Articles
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/new-article" className="nav__link">
            Create Article
          </Link>
        </li>
      </ul>
      <div className="nav__profile">
        <Popover placement="bottom" content={content} trigger="click">
          <Button type="text" icon={<CaretDownOutlined />} />
        </Popover>
        <Avatar shape="circle" style={{ backgroundColor: "#87d068" }}>
          {user[0]}
        </Avatar>
      </div>
    </div>
  );
};

export default PrivateNavigation;
