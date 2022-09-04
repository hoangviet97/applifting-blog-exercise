import "../../test/matchMedia";
import "@testing-library/jest-dom";
import { getByRole, render, screen } from "@testing-library/react";
import HeaderAuth from "./HeaderAuth";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const store = mockStore({
  authReducer: {
    isAuthenticated: true,
    user: "viet97"
  }
});

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <HeaderAuth />
      </BrowserRouter>
    </Provider>
  );
});

it("Should render login button if isAuthenticated value is false", () => {
  const login = screen.getByTestId("nav-login");
  expect(login).toBeVisible();
});
