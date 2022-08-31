import React from "react";
import { Button, Form, Input, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { uploadArticleImage, createArticle } from "../../redux/actions/articleActions";

const CreateArticlePage = () => {
  const dispatch = useDispatch<any>();
  const imageId = useSelector((state: any) => state.articleReducer.uploadedImage);
  let formdata = new FormData();

  const { TextArea } = Input;

  const onUploadImage = async (e: any) => {
    formdata.append("image", e.target.files[0]);

    //dispatch(uploadArticleImage(formdata));
  };

  const onSubmitFormHandle = (values: any) => {
    dispatch(createArticle(values, formdata));
  };

  return (
    <div className="article-operation container container__content">
      <header>
        <h1>Create new article</h1>
      </header>
      <div className="article-operation__body">
        <Form onFinish={onSubmitFormHandle}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Publish Article
            </Button>
          </Form.Item>
          <Form.Item label="Article Title" name="title" rules={[{ required: true, message: "Please input title!" }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <input type="file" name="file" onChange={(e) => onUploadImage(e)} />
          </Form.Item>
          <Form.Item label="Content" name="content" rules={[{ required: true, message: "Please input content!" }]}>
            <TextArea rows={15} placeholder="Supports markdown. Yay!" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateArticlePage;
