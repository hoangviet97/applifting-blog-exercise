import React from "react";
import { Spin } from "antd";

const FullPageLoader = () => {
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100vh", zIndex: 99999, backgroundColor: "grey" }}>
      <Spin />
    </div>
  );
};

export default FullPageLoader;
