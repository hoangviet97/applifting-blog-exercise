import React, { FC, useState } from "react";
import CommentItem from "./CommentItem";
import { useSelector } from "react-redux";

const CommentList = () => {
  const comments = useSelector((state: any) => state.articleReducer.comments);
  //const [comments, setComments] = useState([]);

  return (
    <div>
      {comments.map((comment: any) => (
        <CommentItem comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
