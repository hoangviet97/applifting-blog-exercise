import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const MyArticles = () => {
  return (
    <div className="article-personal container container__content">
      <header>
        <h1>My articles</h1>
        <Link to="/new-article">
          <Button type="primary">Create New Article</Button>
        </Link>
      </header>
    </div>
  );
};

export default MyArticles;
