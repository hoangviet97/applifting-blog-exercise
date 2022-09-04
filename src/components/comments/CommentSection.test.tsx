import "../../test/matchMedia";
import "@testing-library/jest-dom";
import { getByRole, render, screen } from "@testing-library/react";
import CommentSection from "./CommentSection";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const store = mockStore({
  authReducer: {
    isAuthenticated: false,
    user: "viet97"
  },
  articleReducer: {
    articles: [],
    articleComments: []
  }
});

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CommentSection />
      </BrowserRouter>
    </Provider>
  );
});

it("Should render number of comments", () => {
  const numberOfComments = screen.getByTestId("comments-num");
  expect(numberOfComments.textContent).toEqual("Comments (0)");
});
