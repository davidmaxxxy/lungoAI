// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/main.scss";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import WorkflowManagementPage from "./pages/WorkflowManagement/WorkflowManagementPage";
import PortfolioPage from "./pages/PortfolioPage/PortfolioPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Hero />} />

        {/* The single entry point for the workflow with all stages */}
        <Route path="/stages" element={<WorkflowManagementPage />} />

        {/* Portfolio route */}
        <Route path="/portfolio" element={<PortfolioPage />} />

        {/* Removed Login route as it's not part of the flow anymore */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
