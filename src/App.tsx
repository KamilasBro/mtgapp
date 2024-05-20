import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import Home from "./pages/Home/Home";
import BgAnim from "./components/BgAnim/BgAnim";
import Searched from "./pages/Searched/Searched";
import Sets from "./pages/Sets/Sets";
import ChosenSet from "./pages/ChosenSet/ChosenSet";
import "./assets/scss/global.scss";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <BgAnim />
      <Navbar />
      <div className="flex justify-center">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:query" element={<Searched />} />
            <Route path="/sets" element={<Sets />} />
            <Route path="/sets/:setCode" element={<ChosenSet />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
