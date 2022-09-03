import React, { FC, useState } from "react";
import CommentItem from "./CommentItem";
import { useSelector } from "react-redux";

const CommentList = () => {
  const comments = useSelector((state: any) => state.articleReducer.article.comments);

  return <div>{comments && comments.map((comment: any) => <CommentItem />)}</div>;
};

export default CommentList;
