import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getArticle, getArticles } from "../../redux/actions/articleActions";
import { Skeleton } from "antd";
import axiosClient from "../../helpers/axios";
import ReactMarkdown from "react-markdown";
import ArticleImageSkeleton from "../../components/Skeletons/ArticleImageSkeleton";
import CommentSection from "../../components/comments/CommentSection";
import { article } from "../../types/types";
import { AppDispatch } from "../../redux/store";
import ArticleSecondaryInfo from "../../components/article/ArticleSecondaryInfo";

const ArticleDetail: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const params: any = useParams();
  const [img, setImg] = useState<string>("");
  const [imgLoading, setImgLoading] = useState<boolean>(false);

  const user = useSelector((state: any) => state.authReducer.user);
  const { article, articles, articlesLoading } = useSelector((state: any) => state.articleReducer);

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
      {articlesLoading ? (
        <Skeleton paragraph={{ rows: 10 }} />
      ) : (
        <div className="article-detail__content left-area">
          <h1>{article.title}</h1>
          <ArticleSecondaryInfo user={user} createdAt={article.createdAt} />
          <div className="article-detail__image-box">{imgLoading ? <ArticleImageSkeleton /> : <img className="article-detail__image" src={img} alt="image" />}</div>
          <div className="article-detail__text">
            <ReactMarkdown>{article && article.perex}</ReactMarkdown>
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
