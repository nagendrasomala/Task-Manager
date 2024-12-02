import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskDashboard from "./components/TaskDashboard";
import TaskListPage from "./components/TaskListPage";

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
