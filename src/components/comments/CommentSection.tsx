import React, { useState } from "react";
import { Comment, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CommentEditor from "./CommentEditor";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";
import { addComment } from "../../redux/actions/articleActions";
import { AppDispatch } from "../../redux/store";

const CommentSection: React.FunctionComponent = () => {
  const params: any = useParams();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: any) => state.authReducer.user);
  const comments = useSelector((state: any) => state.articleReducer.articleComments);

  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const data = {
      articleId: params.articleId,
      author: user,
      content: value
    };
    dispatch(addComment(data));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <div>
        <span data-testid="comments-num">Comments ({comments.length})</span>
      </div>
      <Comment
        avatar={
          <Avatar shape="circle" style={{ backgroundColor: "#87d068" }}>
            {user[0]}
          </Avatar>
        }
        content={<CommentEditor onChange={handleChange} onSubmit={handleSubmit} value={value} />}
      />
      <CommentList />
    </div>
  );
};

export default CommentSection;
