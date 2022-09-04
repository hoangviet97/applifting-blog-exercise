import "../../test/matchMedia";
import "@testing-library/jest-dom";
import { getByRole, render, screen } from "@testing-library/react";
import CommentList from "./CommentList";
import CommentItem from "./CommentItem";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const store = mockStore({
  authReducer: {
    isAuthenticated: true,
    user: "viet97"
  },
  articleReducer: {
    articles: [],
    article: {},
    articleComments: [
      { commentId: "fiofe-ffft5-3lvp4", author: "viet97", content: "Another test comment", createdAt: new Date(), score: 0 },
      { commentId: "4rfe-ff3dft5-glvp1c", author: "viet97", content: "Another test comment 2", createdAt: new Date(), score: 0 }
    ]
  }
});

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CommentList />
      </BrowserRouter>
    </Provider>
  );
});

it("Comment should be rendered in component if any exist in array", () => {
  const comments = screen.getAllByTestId("comment");
  expect(comments[0]).toBeInTheDocument();
});
