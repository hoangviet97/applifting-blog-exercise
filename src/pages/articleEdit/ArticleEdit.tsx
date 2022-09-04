import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Form, Input, message, Upload } from "antd";
import axiosClient from "../../helpers/axios";
import { getArticle, createArticle, updateArticleWithoutImage, updateArticleWithImage } from "../../redux/actions/articleActions";
import _ from "lodash";
import { AppDispatch } from "../../redux/store";

const ArticleEdit: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const params: any = useParams();
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const [img, setImg] = useState<string>("");
  const [newImage, setNewImage] = useState<any>();
  const [imgLoading, setImgLoading] = useState<boolean>(false);
  const [isModified, setIsModified] = useState<boolean>(false);

  const { article, articlesLoading } = useSelector((state: any) => state.articleReducer);

  const getImage = async (id: string) => {
    const res = await axiosClient.get(`/images/${id}`, { responseType: "blob" });
    const dat = URL.createObjectURL(res.data);
    setImg(dat);
    setImgLoading(false);
  };

  useEffect(() => {
    setImgLoading(true);
    dispatch(getArticle(params.articleId));
  }, []);

  useEffect(() => {
    article.imageId !== undefined && getImage(article.imageId);
    form.setFieldsValue({ title: article.title, perex: article.perex, content: article.content });
  }, [article]);

  const onSubmitFormHandle = (values: any) => {
    const ogArticle = { title: article.title, perex: article.perex, content: article.content };

    if (img.length > 0) {
      if (_.isEqual(values, ogArticle) && !isModified) {
        message.info("Nothing to update!");
      } else {
        const formData = new FormData();
        formData.append("image", newImage);
        isModified ? dispatch(updateArticleWithImage(article.articleId, values, article.imageId, formData)) : dispatch(updateArticleWithoutImage(article.articleId, values));
      }
    } else {
      message.error("Feature image cannot be empty!");
    }
  };

  const onUploadImage = (e: any) => {
    setIsModified(true);

    if (e.fileList.length > 0) {
      setNewImage(e.file);
      const x = URL.createObjectURL(e.file);
      setImg(x);
    }
  };

  const onRemoveImage = () => {
    setImg("");
  };

  return (
    <div>
      <div className="article-operation container container__content">
        <div className="article-operation__body">
          <Form form={form} onFinish={onSubmitFormHandle} layout="vertical">
            <Form.Item>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <h1>Edit article</h1>
                <Button type="primary" disabled={articlesLoading} htmlType="submit">
                  {articlesLoading ? "Please wait..." : "Publish Article"}
                </Button>
              </div>
            </Form.Item>
            <Form.Item label="Article Title" name="title" rules={[{ required: true, message: "Please input title!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Feature image">
              {imgLoading ? <div>loading...</div> : img.length > 0 && <img className="article__feature-img" src={img} alt="feature image" />}
              <Upload beforeUpload={() => false} maxCount={1} onRemove={onRemoveImage} onChange={onUploadImage}>
                <Button disabled={imgLoading}>Upload an Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Perex" name="perex" rules={[{ required: true, message: "Please input perex text!" }]}>
              <TextArea autoSize={{ minRows: 4, maxRows: 4 }} autoComplete="false" />
            </Form.Item>
            <Form.Item label="Content" name="content" rules={[{ required: true, message: "Please input content!" }]}>
              <TextArea autoSize={{ minRows: 15, maxRows: 25 }} autoComplete="false" placeholder="Supports markdown. Yay!" />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ArticleEdit;
