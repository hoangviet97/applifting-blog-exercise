import React from "react";
import CommentItem from "./CommentItem";
import { useSelector } from "react-redux";
import { comment } from "../../types/types";

const CommentList: React.FunctionComponent = () => {
  //Selectors
  const { articleComments } = useSelector((state: any) => state.articleReducer);

  return <div>{articleComments && articleComments.map((comment: comment, index: number) => <CommentItem key={index} item={comment} />)}</div>;
};

export default CommentList;
