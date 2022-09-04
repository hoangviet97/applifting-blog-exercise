import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Popover, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { logout } from "../../redux/actions/authActions";
import { AppDispatch } from "../../redux/store";

const PrivateNavigation: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: any) => state.authReducer);

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
      <div style={{ display: "flex", alignItems: "center", padding: 0 }}>
        <div className="nav__list">
          <Link to="/my-articles" className="nav__link">
            My Articles
          </Link>
          <Link to="/new-article">Create Article</Link>
        </div>
      </div>
      <div className="nav__profile">
        <Popover placement="bottom" content={content} trigger="click">
          <Button type="text" icon={<CaretDownOutlined style={{ fontSize: "12px" }} />} />
        </Popover>
        <Avatar shape="circle" style={{ backgroundColor: "#87d068" }}>
          {user[0]}
        </Avatar>
      </div>
    </div>
  );
};

export default PrivateNavigation;
