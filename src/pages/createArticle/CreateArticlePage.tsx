import React, { useState } from "react";
import { Button, Form, Input, Tabs, message, Upload } from "antd";
import Markdown from "markdown-to-jsx";
import { useDispatch, useSelector } from "react-redux";
import { uploadArticleImage, createArticle } from "../../redux/actions/articleActions";
import { SegmentedValue } from "antd/lib/segmented";

const CreateArticlePage = () => {
  const dispatch = useDispatch<any>();
  let formData = new FormData();
  const [content, setContent] = useState<string>("");

  const { TextArea } = Input;
  const { TabPane } = Tabs;

  const onSubmitFormHandle = (values: any) => {
    dispatch(createArticle(values, formData));
  };

  const onUploadImage = (e: any) => {
    console.log(e.file.name);
    formData.append("image", e.file);
  };

  return (
    <div className="article-operation container container__content">
      <header>
        <h1>Create new article</h1>
      </header>
      <div className="article-operation__body">
        <Form onFinish={onSubmitFormHandle} layout="vertical">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Publish Article
            </Button>
          </Form.Item>
          <Form.Item label="Article Title" name="title" rules={[{ required: true, message: "Please input title!" }]}>
            <Input />
          </Form.Item>
          <Form.Item rules={[{ required: true, message: "Please select image" }]}>
            <Upload listType="picture" beforeUpload={() => false} className="upload-list-inline" maxCount={1} onChange={onUploadImage}>
              <Button>Upload image</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Content" name="content" rules={[{ required: true, message: "Please input content!" }]}>
            <TextArea rows={15} onChange={(e) => setContent(e.target.value)} placeholder="Supports markdown. Yay!" />
          </Form.Item>
        </Form>
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
};

export default CreateArticlePage;
