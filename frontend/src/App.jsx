import React from "react";
import LandingPage from "./pages/LandingPage";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default App;
