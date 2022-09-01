import React from "react";
import { PictureOutlined } from "@ant-design/icons";

const ArticlePreviewSkeleton = () => {
  return (
    <div className="article-preview__skeleton">
      <PictureOutlined className="article-preview__icon" />
    </div>
  );
};

export default ArticlePreviewSkeleton;
