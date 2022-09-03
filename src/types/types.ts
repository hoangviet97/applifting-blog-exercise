export type article = {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  createdAt: Date;
  lastUpdatedAt: Date;
};

export type articleDetail = article & { content: string; comments: comment[] };

export type comment = {
  commentId: string;
  author: string;
  content: string;
  createdAt: Date;
  score: number;
};
