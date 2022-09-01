import React, { useEffect } from "react";
import "./styles/main.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import Recent from "./pages/recent/Recent";
import CreateArticlePage from "./pages/createArticle/CreateArticlePage";
import ArticleDetail from "./pages/ArticleDetail/ArticleDetail";
import setAuthToken from "./helpers/setAuthToken";
import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/actions/authActions";

const App = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <div className="app">
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="articles" element={<Recent />} />
          <Route path="articles/:articleId" element={<ArticleDetail />} />
          <Route path="/new-article" element={<CreateArticlePage />} />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
