import React from "react";
import { PictureOutlined } from "@ant-design/icons";

const FeatureImageSkeleton = () => {
  return (
    <div className="article__feature-img" style={{ backgroundColor: "grey" }}>
      <PictureOutlined style={{ fontSize: "10px" }} />
    </div>
  );
};

export default FeatureImageSkeleton;
