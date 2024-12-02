import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskDashboard from "./pages/TaskDashboard";
import TaskListPage from "./pages/TaskListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskDashboard />} />
        <Route path="/tasks" element={<TaskListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
