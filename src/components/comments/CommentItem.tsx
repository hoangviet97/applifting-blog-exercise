import React, { useState, FC } from "react";
import moment from "moment";
import { Tooltip, Comment, Avatar } from "antd";
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons";

interface Props {
  comment: any;
}

const CommentItem: FC<Props> = ({ comment: { author, content, postedAt, score } }) => {
  const [action, setAction] = useState<string | null>(null);

  const like = () => {
    setAction("liked");
  };

  const dislike = () => {
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-score" title="Score">
      <div>
        <span className="comment-action">{score}</span>
      </div>
    </Tooltip>,
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>{React.createElement(action === "liked" ? LikeFilled : LikeOutlined)}</span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>{React.createElement(action === "disliked" ? DislikeFilled : DislikeOutlined)}</span>
    </Tooltip>
  ];

  return <Comment actions={actions} author={<a>{author}</a>} avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />} content={<p>{content}</p>} datetime={<span>{postedAt}</span>} />;
};

export default CommentItem;
