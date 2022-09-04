import React, { useState } from "react";
import { Comment, Avatar, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CommentEditor from "./CommentEditor";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";
import { addComment } from "../../redux/actions/articleActions";
import { AppDispatch } from "../../redux/store";

const CommentSection: React.FunctionComponent = () => {
  const params: any = useParams();
  const dispatch: AppDispatch = useDispatch();

  // Selectors
  const { user } = useSelector((state: any) => state.authReducer);
  const { articleComments, commentLoading } = useSelector((state: any) => state.articleReducer);

  const [value, setValue] = useState<string>("");

  const handleSubmit = () => {
    const data = {
      articleId: params.articleId,
      author: user,
      content: value
    };
    value.length < 1 ? message.error("Comment cannot be empty!") : dispatch(addComment(data));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <div>
        <span data-testid="comments-num">Comments ({articleComments.length})</span>
      </div>
      <Comment
        avatar={
          <Avatar shape="circle" style={{ backgroundColor: "#87d068" }}>
            {user[0]}
          </Avatar>
        }
        content={<CommentEditor onChange={handleChange} loading={commentLoading} onSubmit={handleSubmit} value={value} />}
      />
      <CommentList />
    </div>
  );
};

export default CommentSection;
