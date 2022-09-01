import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import axiosClient from "../../helpers/axios";
import { Link } from "react-router-dom";
import ArticlePreviewSkeleton from "../Skeletons/ArticlePreviewSkeleton";

interface Props {
  article: any;
}

const ArticlePreview: React.FunctionComponent<Props> = ({ article }) => {
  const [img, setImg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useSelector((state: any) => state.authReducer.user);

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
    <div className="article-preview">
      {isLoading ? <ArticlePreviewSkeleton /> : <img className="article-preview__image" src={img} alt="Article preview image" />}
      <div className="article-preview__content">
        <h2>{article.title}</h2>
        <div className="article-preview__info">
          <div className="article-detail__author">{user}</div>
          <div className="article-detail__date">{article.createdAt}</div>
        </div>
        <Link to={`${article.articleId}`}>Read whole article</Link>
      </div>
    </div>
  );
};

export default ArticlePreview;
