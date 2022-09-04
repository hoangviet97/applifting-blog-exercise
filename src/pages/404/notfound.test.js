import { getByRole, render, screen } from "../../test-utils";
import React from "react";
import NotFound from "./NotFound";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

it("Should be visible", () => {
  render(<NotFound />);
  const el = screen.getByRole("textbox");
  expect(el).toBeInTheDocument();
});
