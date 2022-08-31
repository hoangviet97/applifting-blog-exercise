import { GET_ARTICLES, GET_ARTICLES_FAIL, UPLOAD_IMAGE } from "../actions/types";

const initialState = {
  articles: [],
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
    default:
      return state;
  }
}

export default articleReducer;
