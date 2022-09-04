import "../../test/matchMedia";
import "@testing-library/jest-dom";
import { getByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const store = mockStore({
  authReducer: {
    isAuthenticated: false,
    user: "viet97"
  }
});

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
});

it("Login form should be in component", () => {
  const login = screen.getByRole("form");
  expect(login).toBeInTheDocument();
});
