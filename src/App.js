import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./styles/main.scss";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import MacroTrendInputPage from "./pages/MacroTrendInputPage/MaroTrendInputPage";
import ImpactAssessmentPage from "./pages/ImpactAssessmentPage/ImpactAssessmentPage";

function App() {
  return (
    <Router>
      <Header />
      <Hero />
      <Routes>
        {" "}
        <Route path="/" element={<MacroTrendInputPage />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
