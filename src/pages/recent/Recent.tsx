import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles, resetArticles } from "../../redux/actions/articleActions";
import ArticlePreview from "../../components/article/ArticlePreview";
import { article } from "../../types/types";
import { AppDispatch, AppState } from "../../redux/store";

const Recent: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { articles, loading } = useSelector((state: any) => state.articleReducer);

  useEffect(() => {
    dispatch(getArticles());

    return () => {
      dispatch(resetArticles());
    };
  }, []);

  return (
    <div className="recent-articles container container__content">
      <h1>Recent Articles</h1>
      <div className="article__list">{loading ? <div>Loading...</div> : articles.slice(0, 5).map((article: article, index: number) => <ArticlePreview key={index} article={article} />)}</div>
    </div>
  );
};

export default Recent;
