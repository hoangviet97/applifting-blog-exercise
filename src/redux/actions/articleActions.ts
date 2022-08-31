import { Dispatch } from "redux";
import axiosClient from "../../helpers/axios";
import { CREATE_ARTICLE, GET_ARTICLES, GET_ARTICLES_FAIL, UPLOAD_IMAGE } from "./types";
import { message } from "antd";

export const createArticle = (data: any, image: any) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  try {
    const imageRes = await axiosClient.post("/images", image, config);
    Object.assign(data, { imageId: imageRes.data[0].imageId });
    const res = await axiosClient.post("/articles", data);
  } catch (error: any) {
    message.error(error.response.data.message);
    dispatch({ type: GET_ARTICLES_FAIL });
  }
};

export const getArticles = () => async (dispatch: Dispatch) => {
  try {
    const res = await axiosClient.get("/articles");
    const res2 = await axiosClient.get(`/images/${"d3593220-bc46-45a5-bdd1-950a3c7c8c5f"}`);
    dispatch({ type: GET_ARTICLES, payload: res.data.items });
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
