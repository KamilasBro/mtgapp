import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import ResetRedux from "./utils/ResetRedux";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import BgAnim from "./components/BgAnim/BgAnim";
import Searched from "./pages/Searched/Searched";
import "./assets/scss/global.scss";

const App: React.FC = () => {
  return (
    <Router>
      <BgAnim />
      <Navbar />
      <Provider store={store}>
        <ResetRedux />
        <div className="flex justify-center">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:query" element={<Searched />} />

            </Routes>
          </main>
        </div>
      </Provider>
      <Footer />
    </Router>
  );
};

export default App;
