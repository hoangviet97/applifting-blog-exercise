import { getByRole, render, screen } from "@testing-library/react";
import ArticleSecondaryInfo from "./ArticleSecondaryInfo";
import "@testing-library/jest-dom";

beforeEach(() => {
  render(<ArticleSecondaryInfo user="viet97" createdAt={new Date()} />);
});

it("Should render username and date", () => {
  const user = screen.getByTestId("user");
  const date = screen.getByTestId("date");
  expect(user).toBeInTheDocument();
  expect(date).toBeInTheDocument();
});
