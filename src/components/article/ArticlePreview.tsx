import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import axiosClient from "../../helpers/axios";
import { Link } from "react-router-dom";
import moment from "moment";
import ArticlePreviewSkeleton from "../Skeletons/ArticlePreviewSkeleton";
import { article } from "../../types/types";
import ArticleSecondaryInfo from "./ArticleSecondaryInfo";

interface Props {
  article: article;
}

const ArticlePreview: React.FunctionComponent<Props> = ({ article }) => {
  // States
  const [img, setImg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Selectors
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
        <ArticleSecondaryInfo user={user} createdAt={article.createdAt} />
        <div>{article.perex}</div>
        <div className="article-preview__link" data-testid="article-link">
          <Link to={`${article.articleId}`}>Read whole article</Link>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
