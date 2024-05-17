import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import BgAnim from "./components/BgAnim/BgAnim";
import Searched from "./pages/Searched/Searched";
import "./assets/scss/global.scss";
import Sets from "./pages/Sets/Sets";

const App: React.FC = () => {
  return (
    <Router>
      <BgAnim />
      <Navbar />
      <div className="flex justify-center">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:query" element={<Searched />} />
              <Route path="/sets" element={<Sets />} />
            </Routes>
          </main>
        </div>
      <Footer />
    </Router>
  );
};

export default App;
