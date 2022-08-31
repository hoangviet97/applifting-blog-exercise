import React, { useEffect } from "react";
import "./styles/main.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import Recent from "./pages/recent/Recent";
import CreateArticlePage from "./pages/createArticle/CreateArticlePage";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  useEffect(() => {}, []);

  return (
    <div className="app">
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/recent-articles" element={<Recent />} />
          <Route path="/new-article" element={<CreateArticlePage />} />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
