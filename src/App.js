import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import Header from "./Layouts/Header";
import HomePage from "./HomePage";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {" "}
          {/* Use Routes instead of Switch */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
