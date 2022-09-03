import React, { useState } from "react";
import { Comment, Avatar } from "antd";
import { useSelector } from "react-redux";
import CommentEditor from "./CommentEditor";
import CommentList from "./CommentList";

const CommentSection = () => {
  const user = useSelector((state: any) => state.authReducer.user);

  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = () => {};

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Comment
        avatar={
          <Avatar shape="circle" style={{ backgroundColor: "#87d068" }} alt="Han Solo">
            {user[0]}
          </Avatar>
        }
        content={<CommentEditor onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} value={value} />}
      />
      {comments && <CommentList />}
    </div>
  );
};

export default CommentSection;
