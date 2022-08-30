import React from "react";
import Navigation from "../navigation/Navigation";
import HeaderAuth from "./HeaderAuth";
import Container from "../container/Container";

const Header = () => {
  return (
    <div className="header">
      <Container width={1170}>
        <div className="header__content">
          <Navigation />
          <HeaderAuth />
        </div>
      </Container>
    </div>
  );
};

export default Header;
