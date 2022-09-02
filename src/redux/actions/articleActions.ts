import { Dispatch } from "redux";
import axiosClient from "../../helpers/axios";
import { GET_ARTICLE, GET_ARTICLES, GET_ARTICLES_FAIL, UPLOAD_IMAGE, ARTICLE_LOADING, DELETE_ARTICLE } from "./types";
import { message } from "antd";

export const createArticle = (data: any, image: any) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  try {
    const imageRes = await axiosClient.post("/images", image, config);
    console.log(imageRes.data[0].imageId);
    Object.assign(data, { imageId: imageRes.data[0].imageId });
    console.log(data);
    const res = await axiosClient.post("/articles", data);
    message.success("New message successfuly created!");
  } catch (error: any) {
    console.log(error.response.data);
    message.error(error.response.data.message);
    dispatch({ type: GET_ARTICLES_FAIL });
  }
};

export const getArticles = () => async (dispatch: Dispatch) => {
  try {
    const res = await axiosClient.get("/articles");
    dispatch({ type: GET_ARTICLES, payload: res.data.items });
  } catch (error: any) {
    message.error(error.response.data.message);
    dispatch({ type: GET_ARTICLES_FAIL });
  }
};

export const getArticle = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(articleLoading());
    const res = await axiosClient.get(`/articles/${id}`);
    dispatch({ type: GET_ARTICLE, payload: res.data });
    console.log(res);
  } catch (error: any) {
    message.error(error.response.data.message);
    dispatch({ type: GET_ARTICLES_FAIL });
  }
};

export const deleteArticle = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axiosClient.delete(`/articles/${id}`);
    dispatch({ type: DELETE_ARTICLE, payload: id });
    message.success("Selected article was deleted!");
  } catch (error: any) {
    message.error(error.response.data.message);
    dispatch({ type: GET_ARTICLES_FAIL });
  }
};

export const uploadArticleImage = (formdata: any) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  try {
    const res = await axiosClient.post("/images", formdata, config);
    dispatch({ type: UPLOAD_IMAGE, payload: res.data[0].imageId });
  } catch (error: any) {
    dispatch({ type: GET_ARTICLES_FAIL });
  }
};

export const articleLoading = () => {
  return {
    type: ARTICLE_LOADING
  };
};
