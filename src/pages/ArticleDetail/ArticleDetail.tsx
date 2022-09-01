import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Params } from "react-router-dom";
import { getArticle } from "../../redux/actions/articleActions";
import moment from "moment";
import { Avatar, Comment, Tooltip } from "antd";
import axiosClient from "../../helpers/axios";
import Markdown from "markdown-to-jsx";

const ArticleDetail = () => {
  const dispatch = useDispatch<any>();
  const params: Readonly<Params<string>> = useParams();
  const [img, setImg] = useState<string>("");

  const article = useSelector((state: any) => state.articleReducer.article);
  const isLoading = useSelector((state: any) => state.articleReducer.loading);

  useEffect(() => {
    dispatch(getArticle(params.articleId));
    getImage();
  }, []);

  const getImage = async () => {
    const res = await axiosClient.get(`/images/${article.imageId}`, { responseType: "blob" });
    const dat = URL.createObjectURL(res.data);
    setImg(dat);
  };

  return (
    <div className="article-detail container container__content">
      <div className="article-detail__content">
        <h1>{article.title}</h1>
        <div className="article-detail__info">
          <div className="article-detail__author"></div>
          <div className="article-detail__date">{moment(article.createdAt).format("MMM Do YY")}</div>
        </div>
        <div>
          <img src={img} alt="" width="760px" height="504px" />
        </div>
        <div className="article-detail__text">
          <Markdown>{article.content}</Markdown>
        </div>
      </div>
      <div className="article-detail__related">
        <h3>Related articles</h3>
      </div>
    </div>
  );
};

export default ArticleDetail;
