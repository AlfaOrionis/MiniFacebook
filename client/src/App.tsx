import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import MainLayout from "./hoc/mainLayout";
import Home from "./pages/home";
import { useAppSelector } from "./store";

const App = () => {
  const user = useAppSelector((state) => state.auth);
  console.log(user.isAuth);
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {user.isAuth && <Route path="/home" element={<Home />} />}
          <Route path="*" element={<Login />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
