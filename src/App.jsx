import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Components/TaskDashboard.jsx';
import ListPage from "./Components/TaskListPage.jsx";



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
