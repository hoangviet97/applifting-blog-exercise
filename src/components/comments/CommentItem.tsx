import { FC } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Tooltip, Comment, Avatar } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { comment } from "../../types/types";
import { setUpVote, setDownVote } from "../../redux/actions/articleActions";
import { AppDispatch } from "../../redux/store";

interface Props {
  item: comment;
}

const CommentItem: FC<Props> = ({ item: { commentId, author, content, createdAt, score } }) => {
  const dispatch: AppDispatch = useDispatch();

  const like = () => {
    dispatch(setUpVote(commentId));
  };

  const dislike = () => {
    dispatch(setDownVote(commentId));
  };

  const actions = [
    <Tooltip key="comment-score" title="Score">
      <span className="comment__score" data-testid="comment-score">
        {score}
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-like" title="Like">
      <span className="comment__vote" onClick={like}>
        <UpOutlined />
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span className="comment__vote" onClick={dislike}>
        <DownOutlined />
      </span>
    </Tooltip>
  ];

  return <Comment data-testid="comment" actions={actions} author={<a data-testid="comment-author">{author}</a>} avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />} content={<p data-testid="comment-content">{content}</p>} datetime={<span>{moment(createdAt).locale("cs").fromNow()}</span>} />;
};

export default CommentItem;
