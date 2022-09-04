import "../../test/matchMedia";
import "@testing-library/jest-dom";
import { getByRole, render, screen } from "@testing-library/react";
import CommentItem from "./CommentItem";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  const comment = {
    commentId: "mklmk-iiuu77-jinin",
    author: "viet97",
    content: "Test article 2",
    createdAt: new Date(),
    score: 0
  };

  render(
    <Provider store={store}>
      <BrowserRouter>
        <CommentItem item={comment} />
      </BrowserRouter>
    </Provider>
  );
});

it("Should render all comment elements", () => {
  const author = screen.getByTestId("comment-author");
  const content = screen.getByTestId("comment-content");
  const score = screen.getByTestId("comment-score");
  expect(author).toBeInTheDocument();
  expect(content).toBeInTheDocument();
  expect(score).toBeInTheDocument();
});
