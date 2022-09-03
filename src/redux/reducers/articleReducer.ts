import { GET_ARTICLE, DELETE_ARTICLE, GET_ARTICLES, GET_ARTICLES_FAIL, ADD_COMMENT, UPLOAD_IMAGE, ARTICLE_LOADING, ARTICLES_LOADING, SET_UP_VOTE, SET_DOWN_VOTE } from "../actions/types";
import moment from "moment";

const initialState = {
  articles: [],
  article: {},
  uploadedImage: "",
  images: [],
  articlesLoading: false,
  articleComments: []
};

function articleReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: payload.reverse(),
        articlesLoading: false
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: payload,
        articleComments: payload.comments,
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
    case ADD_COMMENT:
      return {
        ...state,
        articleComments: [payload, ...state.articleComments]
      };
    case SET_UP_VOTE:
      return {
        ...state,
        articleComments: state.articleComments.map((comment: any) => (comment.commentId === payload.id ? payload.data : comment))
      };
    case SET_DOWN_VOTE:
      return {
        ...state,
        articleComments: state.articleComments.map((comment: any) => (comment.commentId === payload.id ? payload.data : comment))
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
