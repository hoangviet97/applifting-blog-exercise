import React, { FC } from "react";
import moment from "moment";

interface Props {
  user: string;
  createdAt: Date;
}

const ArticleSecondaryInfo: FC<Props> = ({ user, createdAt }) => {
  return (
    <div className="article-detail__info">
      <div className="article-detail__author" data-testid="user">
        {user}
      </div>
      <div className="article-detail__divider"></div>
      <div className="article-detail__date" data-testid="date">
        {moment(createdAt).locale("cs").format("L")}
      </div>
    </div>
  );
};

export default ArticleSecondaryInfo;
