import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Footer from "./components/navigation/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
