import { getByRole, render, screen } from "@testing-library/react";
import React from "react";
import ArticlePreview from "./ArticlePreview";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  const article = {
    articleId: "12uvvr0-942fjvs-bmop",
    imageId: "4aad9988-7c3e-4e47-9434-7887d54703b6",
    title: "Test article 2",
    perex: "Lorem ipsum",
    createdAt: new Date(),
    lastUpdatedAt: new Date()
  };

  render(
    <Provider store={store}>
      <BrowserRouter>
        <ArticlePreview article={article} />
      </BrowserRouter>
    </Provider>
  );
});

it("Should render all article preview elements", () => {
  const title = screen.getByRole("heading", { name: /Test article 2/i });
  const img = screen.getByRole("img");
  const link = screen.getByTestId("article-link");
  expect(title).toBeInTheDocument();
  expect(img).toBeInTheDocument();
  expect(link).toBeInTheDocument();
});
