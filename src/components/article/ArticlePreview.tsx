import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import axiosClient from "../../helpers/axios";
import { Link } from "react-router-dom";

interface Props {
  article: any;
}

const ArticlePreview: React.FunctionComponent<Props> = ({ article }) => {
  const [img, setImg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    article.imageId && getImage();
  }, []);

  const getImage = async () => {
    const res = await axiosClient.get(`/images/${article.imageId}`, { responseType: "blob" });
    const dat = URL.createObjectURL(res.data);
    setImg(dat);
    setIsLoading(false);
  };

  return (
    <div className="article-item">
      {isLoading ? "Please wait..." : <img src={img} alt="Article preview image" />}
      <div className="article-item__content">
        <h2>{article.title}</h2>
        <Link to={`${article.articleId}`}>Read whole article</Link>
      </div>
    </div>
  );
};

export default ArticlePreview;
