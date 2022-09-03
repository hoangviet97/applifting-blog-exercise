import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Form, Input, Tabs, message, Upload } from "antd";
import Markdown from "markdown-to-jsx";
import axiosClient from "../../helpers/axios";
import { getArticle, createArticle } from "../../redux/actions/articleActions";
import { loading } from "../../redux/actions/authActions";

const ArticleEdit = () => {
  const dispatch = useDispatch<any>();
  const params: any = useParams();
  const { TextArea } = Input;
  const formData = new FormData();
  const [form] = Form.useForm();

  const [img, setImg] = useState("");
  const [imgLoading, setImgLoading] = useState(false);

  const article = useSelector((state: any) => state.articleReducer.article);

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
    //dispatch(createArticle(values, formData));
  };

  const onUploadImage = (e: any) => {
    formData.append("image", e.file);
  };

  return (
    <div>
      <div className="article-operation container container__content">
        <header>
          <h1>Edit article</h1>
        </header>
        <div className="article-operation__body">
          <Form form={form} onFinish={onSubmitFormHandle} layout="vertical">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Publish Article
              </Button>
            </Form.Item>
            <Form.Item label="Article Title" name="title" rules={[{ required: true, message: "Please input title!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Feature image">
              {imgLoading ? <div>loading...</div> : <img className="article__feature-img" src={img} alt="feature image" />}
              <Upload listType="picture" beforeUpload={() => false} maxCount={1} onChange={onUploadImage}>
                <Button>Upload image</Button>
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
