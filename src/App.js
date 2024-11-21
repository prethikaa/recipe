import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import Footer from "./Layouts/Footer";
import Header from "./Layouts/Header";
import ListPage from "./ListPage";
import HomePage from "./HomePage";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<HomePage />} />
          <Route path="/all-recipes" element={<ListPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
