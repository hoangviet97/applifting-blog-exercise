import { Dispatch } from "redux";
import axiosClient from "../../helpers/axios";
import { GET_ARTICLE, GET_ARTICLES, GET_ARTICLES_FAIL, UPLOAD_IMAGE, ARTICLE_LOADING, ARTICLES_LOADING, EDIT_ARTICLE, ADD_COMMENT, SET_UP_VOTE, SET_DOWN_VOTE, DELETE_ARTICLE } from "./types";
import { message } from "antd";

export const createArticle = (data: any, image: any) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  try {
    const imageRes = await axiosClient.post("/images", image, config);
    Object.assign(data, { imageId: imageRes.data[0].imageId });
    console.log(imageRes.data);
    const res = await axiosClient.post("/articles", data);
    message.success("New message successfuly created!");
  } catch (error: any) {
    console.log(error.response.data);
    message.error(error.response.data.message);
    dispatch({ type: GET_ARTICLES_FAIL });
  }
};

export const updateArticleWithImage = (article: string, data: any, ogImage: string, image: any) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  try {
    // post new image
    console.log(ogImage);
    const imageRes = await axiosClient.post("/images", image, config);
    Object.assign(data, { imageId: imageRes.data[0].imageId });
    const res = await axiosClient.patch(`/articles/${article}`, data);
    message.success("Article was successfuly edited!");
  } catch (error: any) {
    dispatch({ type: GET_ARTICLES_FAIL });
  }
};

export const updateArticleWithoutImage = (id: string, data: any) => async (dispatch: Dispatch) => {
  try {
    const res = await axiosClient.patch(`/articles/${id}`, data);
    message.success("Article was successfuly edited!");
  } catch (error: any) {
    console.log(error.response.data);
    message.error(error.response.data.message);
    dispatch({ type: GET_ARTICLES_FAIL });
  }
};

export const getArticles = () => async (dispatch: Dispatch) => {
  try {
    dispatch(articlesLoading());
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

export const editArticle = (id: string, data: any) => async (dispatch: Dispatch) => {
  try {
    const res = await axiosClient.delete(`/articles/${id}`, data);
    //dispatch({ type: EDIT_ARTICLE, payload: id });
    message.success("Selected article was updated!");
  } catch (error: any) {
    message.error(error.response.data.message);
    dispatch({ type: GET_ARTICLES_FAIL });
  }
};

export const addComment = (data: any) => async (dispatch: Dispatch) => {
  try {
    const res = await axiosClient.post(`/comments`, data);
    console.log(res.data);
    dispatch({ type: ADD_COMMENT, payload: res.data });
    message.success("Comment created");
  } catch (error: any) {
    console.log(error);
    message.error(error.response.data.message);
    dispatch({ type: GET_ARTICLES_FAIL });
  }
};

export const setUpVote = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axiosClient.post(`/comments/${id}/vote/up`);
    console.log(res.data);
    dispatch({ type: SET_UP_VOTE, payload: { id: id, data: res.data } });
  } catch (error: any) {
    console.log(error);
    message.error(error.response.data.message);
    dispatch({ type: GET_ARTICLES_FAIL });
  }
};

export const setDownVote = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axiosClient.post(`/comments/${id}/vote/down`);
    console.log(res.data);
    dispatch({ type: SET_DOWN_VOTE, payload: { id: id, data: res.data } });
  } catch (error: any) {
    console.log(error);
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

export const articlesLoading = () => {
  return {
    type: ARTICLES_LOADING
  };
};

export const articleLoading = () => {
  return {
    type: ARTICLE_LOADING
  };
};
