import React from "react";
import CommentItem from "./CommentItem";
import { useSelector } from "react-redux";
import { comment } from "../../types/types";

const CommentList: React.FunctionComponent = () => {
  const comments = useSelector((state: any) => state.articleReducer.articleComments);

  return <div>{comments && comments.map((comment: comment, index: number) => <CommentItem key={index} item={comment} />)}</div>;
};

export default CommentList;
