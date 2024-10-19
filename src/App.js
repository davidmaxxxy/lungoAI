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

        {/* Fixed the typo in the route name */}
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
