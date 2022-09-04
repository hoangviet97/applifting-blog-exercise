import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../redux/actions/articleActions";
import ArticlePreview from "../../components/article/ArticlePreview";
import { Skeleton } from "antd";
import { article } from "../../types/types";
import { AppDispatch } from "../../redux/store";

const Recent: React.FunctionComponent = () => {
  const dispatch: any = useDispatch();
  const articles = useSelector((state: any) => state.articleReducer.articles);
  const loading = useSelector((state: any) => state.articleReducer.articlesLoading);

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  return (
    <div className="recent-articles container container__content">
      <h1>Recent Articles</h1>
      <div className="recent-articles__list">{loading ? <Skeleton /> : articles.slice(0, 5).map((article: article, index: number) => <ArticlePreview key={index} article={article} />)}</div>
    </div>
  );
};

export default Recent;
