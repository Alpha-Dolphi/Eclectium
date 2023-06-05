import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store";
import HomePage from "./pages/HomePage";
import CompetitionsPage from "./pages/CompetitionsPage";
import RatingPage from "./pages/RatingPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route index path="/" element={<HomePage />}></Route>
            <Route
              index
              path="/competition"
              element={<CompetitionsPage />}
            ></Route>
            <Route index path="/rating" element={<RatingPage />}></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
