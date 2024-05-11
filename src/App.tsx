import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import "./assets/scss/global.scss";
import BgAnim from "./components/BgAnim/BgAnim";
const App: React.FC = () => {
  return (
    <Router>
      <BgAnim />
      <Navbar />
      <div className="flex justify-center w-screen">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
