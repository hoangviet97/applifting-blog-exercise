import React, { useState } from "react";
import { Button, Form, Input, Tabs, message, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { uploadArticleImage, createArticle } from "../../redux/actions/articleActions";
import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";

const CreateArticlePage: React.FunctionComponent = () => {
  const dispatch = useDispatch<any>();
  const [form] = Form.useForm();
  const [content, setContent] = useState<string>("");
  const [check, setCheck] = useState<any>();
  const [img, setImg] = useState<string>("");

  const { TextArea } = Input;

  const onSubmitFormHandle = (values: any) => {
    const formData = new FormData();
    formData.append("image", check);

    if (img.length > 0) {
      dispatch(createArticle(values, formData));
    } else {
      message.error("Feature image cannot be null!");
    }
  };

  const onUploadImage = (e: any) => {
    if (e.fileList.length > 0) {
      setCheck(e.file);
      const x = URL.createObjectURL(e.file);
      setImg(x);
    }
  };

  const onRemoveImage = (e: any) => {
    setImg("");
  };

  return (
    <div className="article-operation container container__content">
      <div className="article-operation__body">
        <Form form={form} onFinish={onSubmitFormHandle} layout="vertical">
          <Form.Item>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <h1>Create new article</h1>
              <Button type="primary" htmlType="submit">
                Publish Article
              </Button>
            </div>
          </Form.Item>
          <Form.Item label="Article Title" name="title" rules={[{ required: true, message: "Please input title!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Feature image">
            {img.length > 0 && <img className="article__feature-img" src={img} alt="feature image" />}
            <Upload beforeUpload={() => false} onRemove={onRemoveImage} maxCount={1} onChange={(e) => onUploadImage(e)}>
              <Button>Upload image</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Perex" name="perex" rules={[{ required: true, message: "Please input perex text!" }]}>
            <TextArea autoSize={{ minRows: 4, maxRows: 4 }} autoComplete="false" />
          </Form.Item>
          <Form.Item label="Content" name="content" rules={[{ required: true, message: "Please input content!" }]}>
            <TextArea autoSize={{ minRows: 15, maxRows: 25 }} onChange={(e) => setContent(e.target.value)} autoComplete="false" placeholder="Supports markdown. Yay!" />
          </Form.Item>
        </Form>
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
};

export default CreateArticlePage;
