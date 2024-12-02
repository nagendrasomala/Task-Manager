import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "./components/TaskListPage.jsx";
import Dashboard from "./components/TaskDashboard.jsx";
Dashboard


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<ListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
