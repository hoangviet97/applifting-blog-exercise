import { GET_ARTICLE, DELETE_ARTICLE, GET_ARTICLES, GET_ARTICLES_FAIL, UPLOAD_IMAGE, ARTICLE_LOADING, ARTICLES_LOADING } from "../actions/types";
import moment from "moment";

const initialState = {
  articles: [],
  article: {},
  uploadedImage: "",
  images: [],
  articlesLoading: false
};

function articleReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case GET_ARTICLES:
      //const data = payload.sort((a: any, b: any) => moment(b.createdAt).format("MMMM Do YYYY, h:mm:ss") - moment(a.createdAt, "MMMM Do YYYY, h:mm:ss"));

      return {
        ...state,
        articles: payload.reverse(),
        articlesLoading: false
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: payload,
        loading: false
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        uploadedImage: payload
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter((article: any) => article.articleId !== payload)
      };
    case GET_ARTICLES_FAIL:
      return {
        ...state,
        loading: false
      };
    case ARTICLE_LOADING:
      return {
        ...state,
        loading: true
      };
    case ARTICLES_LOADING:
      return {
        ...state,
        articlesLoading: true
      };
    default:
      return state;
  }
}

export default articleReducer;
