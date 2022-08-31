import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import axiosClient from "../../helpers/axios";

interface Props {
  article: any;
}

const ArticlePreview: React.FunctionComponent<Props> = ({ article }) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    article.imageId && getImage();
  }, []);

  const getImage = async () => {
    const res = await axiosClient.get(`/images/${article.imageId}`, { responseType: "blob" });
    const dat = URL.createObjectURL(res.data);
    setImg(dat);
  };

  return (
    <div>
      <h2>{article.title}</h2>
      <img src={img} alt="Article preview image" />
      <p>{article.imageId}</p>
    </div>
  );
};

export default ArticlePreview;
