import React from "react";
import "./styles/main.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <div className="app">
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
