import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Space, Input, InputRef } from "antd";
import { getArticles, deleteArticle } from "../../redux/actions/articleActions";
import type { FilterConfirmProps } from "antd/es/table/interface";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { article } from "../../types/types";
import { AppDispatch } from "../../redux/store";
import { ColumnType } from "antd/lib/table/interface";
import Highlighter from "react-highlight-words";

interface DataType {
  key: string;
  articleId: string;
  title: string;
  perex: string;
  author: string;
  comments: number;
}

const MyArticles: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchInput = useRef<InputRef>(null);
  type DataIndex = keyof DataType;

  // States
  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");

  // Selectors
  const { user } = useSelector((state: any) => state.authReducer);
  const { articles } = useSelector((state: any) => state.articleReducer);

  useEffect(() => {
    // Get all articles
    dispatch(getArticles());
  }, []);

  const onDeleteArticleHandle = (id: string) => {
    dispatch(deleteArticle(id));
  };

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input ref={searchInput} placeholder={`Search ${dataIndex}`} value={selectedKeys[0]} onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])} onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)} style={{ marginBottom: 8, display: "block" }} />
        <Space>
          <Button type="primary" onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (searchedColumn === dataIndex ? <Highlighter highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ""} /> : text)
  });

  // Table columns description
  const columns: ColumnsType<DataType> = [
    {
      title: "Article title",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title")
    },
    {
      title: "Perex",
      dataIndex: "perex",
      key: "perex",
      ...getColumnSearchProps("perex")
    },
    {
      title: "Author",
      dataIndex: "",
      render: () => <span>{user}</span>
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`${record.articleId}`}>
            <EditOutlined />
          </Link>
          <a onClick={() => onDeleteArticleHandle(record.articleId)}>
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
        <Table columns={columns} dataSource={articles} />
      </div>
    </div>
  );
};

export default MyArticles;
