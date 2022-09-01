import { GET_ARTICLE, GET_ARTICLES, GET_ARTICLES_FAIL, UPLOAD_IMAGE, ARTICLE_LOADING } from "../actions/types";

const initialState = {
  articles: [],
  article: {},
  uploadedImage: "",
  images: [],
  loading: false
};

function articleReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: payload,
        loading: false
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
    default:
      return state;
  }
}

export default articleReducer;
