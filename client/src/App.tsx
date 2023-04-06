import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import MainLayout from "./hoc/mainLayout";
import Home from "./pages/home";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
