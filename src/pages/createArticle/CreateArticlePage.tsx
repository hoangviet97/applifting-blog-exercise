import React, { useState } from "react";
import { Button, Form, Input, Tabs, message, Upload } from "antd";
import Rea from "markdown-to-jsx";
import { useDispatch, useSelector } from "react-redux";
import { uploadArticleImage, createArticle } from "../../redux/actions/articleActions";
import { SegmentedValue } from "antd/lib/segmented";
import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";

const CreateArticlePage = () => {
  const dispatch = useDispatch<any>();
  const [form] = Form.useForm();
  const formData = new FormData();
  const [content, setContent] = useState<string>("");
  const [fileCheck, setFileCheck] = useState<any>(0);
  const [check, setCheck] = useState<any>([]);

  const { TextArea } = Input;

  const onSubmitFormHandle = (values: any) => {
    dispatch(createArticle(values, formData));
  };

  const onUploadImage = (e: any) => {
    formData.append("image", e.file);
  };

  return (
    <div className="article-operation container container__content">
      <header>
        <h1>Create new article</h1>
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
          <Form.Item label="Image" rules={[{ required: true, message: "Please input perex text!" }]}>
            <Upload listType="picture" beforeUpload={() => false} className="upload-list-inline" maxCount={1} onChange={onUploadImage}>
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
