import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Space } from "antd";
import { getArticles } from "../../redux/actions/articleActions";
import type { ColumnsType, TableProps } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const MyArticles = () => {
  const dispatch = useDispatch<any>();
  const [editedArticles, setEditedArticles] = useState<any>([]);

  // selectors
  const user = useSelector((state: any) => state.authReducer.user);
  const articles = useSelector((state: any) => state.articleReducer.articles);

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  useEffect(() => {
    const ogArticles = articles.map((article: any) => ({ ...article, comments: 2 }));
    setEditedArticles(ogArticles);
  }, [articles]);

  interface DataType {
    key: React.Key;
    title: string;
    perex: string;
    author: string;
    comments: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Article title",
      dataIndex: "title"
    },
    {
      title: "Perex",
      dataIndex: "perex"
    },
    {
      title: "Author",
      dataIndex: "",
      render: () => <span>{user}</span>
    },
    {
      title: "# of comments",
      dataIndex: "comments"
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <EditOutlined />
          </a>
          <a>
            <DeleteOutlined />
          </a>
        </Space>
      )
    }
  ];

  return (
    <div className="article-personal container container__content">
      <header className="header__control">
        <h1>My articles</h1>
        <Button type="primary">
          <Link to="/new-article">Create New Article</Link>
        </Button>
      </header>
      <div className="article-personal">
        <Table columns={columns} dataSource={editedArticles} />
      </div>
    </div>
  );
};

export default MyArticles;
