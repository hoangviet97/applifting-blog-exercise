import React, { useState, FC } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Tooltip, Comment, Avatar } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { comment } from "../../types/types";
import { setUpVote, setDownVote } from "../../redux/actions/articleActions";

interface Props {
  item: comment;
}

const CommentItem: FC<Props> = ({ item: { commentId, author, content, createdAt, score } }) => {
  const dispatch = useDispatch<any>();
  const [action, setAction] = useState<string | null>(null);

  const like = () => {
    dispatch(setUpVote(commentId));
  };

  const dislike = () => {
    dispatch(setDownVote(commentId));
  };

  const actions = [
    <Tooltip key="comment-score" title="Score">
      <div>
        <span className="comment-action">{score}</span>
      </div>
    </Tooltip>,
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        <UpOutlined />
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        <DownOutlined />
      </span>
    </Tooltip>
  ];

  return <Comment actions={actions} author={<a>{author}</a>} avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />} content={<p>{content}</p>} datetime={<span>{}</span>} />;
};

export default CommentItem;
