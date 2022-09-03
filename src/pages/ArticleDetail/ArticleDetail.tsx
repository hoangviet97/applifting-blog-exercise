import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Params } from "react-router-dom";
import { getArticle, getArticles } from "../../redux/actions/articleActions";
import moment from "moment";
import { Skeleton } from "antd";
import axiosClient from "../../helpers/axios";
import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";
import ArticleImageSkeleton from "../../components/Skeletons/ArticleImageSkeleton";
import CommentSection from "../../components/comments/CommentSection";
import { article } from "../../types/types";
import { AppDispatch } from "../../redux/store";

const ArticleDetail: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const params: any = useParams();
  const [img, setImg] = useState<string>("");
  const [imgLoading, setImgLoading] = useState<boolean>(false);

  const user = useSelector((state: any) => state.authReducer.user);
  const article = useSelector((state: any) => state.articleReducer.article);
  const articles = useSelector((state: any) => state.articleReducer.articles);
  const isLoading = useSelector((state: any) => state.articleReducer.loading);

  const getImage = async (id: string) => {
    setImgLoading(true);
    const res = await axiosClient.get(`/images/${id}`, { responseType: "blob" });
    const dat = URL.createObjectURL(res.data);
    setImg(dat);
    setImgLoading(false);
  };

  useEffect(() => {
    dispatch(getArticle(params.articleId));
    dispatch(getArticles());

    return () => {
      setImg("");
    };
  }, []);

  useEffect(() => {
    article.imageId !== undefined && getImage(article.imageId);
  }, [article]);

  return (
    <div className="article-detail container container__content">
      {isLoading ? (
        <Skeleton paragraph={{ rows: 10 }} />
      ) : (
        <div className="article-detail__content left-area">
          <h1>{article.title}</h1>
          <div className="article-detail__info">
            <div className="article-detail__author">{user}</div>
            <div className="article-detail__divider"></div>
            <div className="article-detail__date">{moment(article.createdAt).locale("cs").format("L")}</div>
          </div>
          <div className="article-detail__image-box">{imgLoading ? <ArticleImageSkeleton /> : <img className="article-detail__image" src={img} alt="image" />}</div>
          <div className="article-detail__text">
            <ReactMarkdown>{article && article.content}</ReactMarkdown>
          </div>
          <div className="article-detail__comments">
            <CommentSection />
          </div>
        </div>
      )}
      <div className="article-detail__related right-area">
        <div className="article-detail__related-container">
          <h3>Related articles</h3>
          <div className="article-detail__related-list">
            {articles
              .slice(0, 4)
              .filter((i: article) => i.articleId !== article.articleId)
              .map((article: article) => (
                <div>
                  <h4>{article.title}</h4>
                  <p>{article.perex}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
