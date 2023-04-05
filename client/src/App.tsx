import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Login from "./pages/login";
import MainLayout from "./hoc/mainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
        <Footer />
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
