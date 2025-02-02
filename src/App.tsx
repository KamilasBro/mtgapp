import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BgAnim from "./components/BgAnim/BgAnim";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import Home from "./pages/Home/Home";
import AdvancedSearch from "./pages/AdvancedSearch/AdvancedSearch";
import Searched from "./pages/Searched/Searched";
import Sets from "./pages/Sets/Sets";
import ChosenSet from "./pages/ChosenSet/ChosenSet";
import Card from "./pages/Card/Card";
import GuessTheCard from "./pages/GuessTheCard/GuessTheCard";
import NotFound from "./pages/NotFound/NotFound";
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
            <Route path="/advanced" element={<AdvancedSearch />} />
            <Route path="/:query" element={<Searched />} />
            <Route path="/sets" element={<Sets />} />
            <Route path="/sets/:setCode" element={<ChosenSet />} />
            <Route path="/card/:set/:code" element={<Card />} />
            <Route path="/guess" element={<GuessTheCard />} />
            <Route path="/*" element={<NotFound message="Page" />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
