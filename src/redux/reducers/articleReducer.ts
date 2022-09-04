import { CREATE_ARTICLE, GET_ARTICLE, DELETE_ARTICLE, GET_ARTICLES, GET_ARTICLES_FAIL, ADD_COMMENT, COMMENT_LOADING, UPLOAD_IMAGE, ARTICLE_LOADING, ARTICLES_LOADING, SET_UP_VOTE, SET_DOWN_VOTE, RESET_ARTICLES } from "../actions/types";
import { article, articleDetail, comment } from "../../types/types";

interface articleState {
  articles: article[];
  article: articleDetail | {};
  articlesLoading: boolean;
  commentLoading: boolean;
  articleComments: comment[];
}

const initialState = {
  articles: [],
  article: {},
  articlesLoading: false,
  commentLoading: false,
  articleComments: []
};

function articleReducer(state: articleState = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ARTICLE:
      return {
        ...state,
        loading: false
      };
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
        articles: state.articles.filter((article: article) => article.articleId !== payload)
      };
    case ADD_COMMENT:
      return {
        ...state,
        commentLoading: false,
        articleComments: [payload, ...state.articleComments]
      };
    case SET_UP_VOTE:
      return {
        ...state,
        articleComments: state.articleComments.map((comment: comment) => (comment.commentId === payload.id ? payload.data : comment))
      };
    case SET_DOWN_VOTE:
      return {
        ...state,
        articleComments: state.articleComments.map((comment: comment) => (comment.commentId === payload.id ? payload.data : comment))
      };
    case GET_ARTICLES_FAIL:
      return {
        ...state,
        loading: false
      };
    case RESET_ARTICLES:
      return {
        ...state,
        articles: []
      };
    case COMMENT_LOADING:
      return {
        ...state,
        commentLoading: true
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
