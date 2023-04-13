import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import MainLayout from "./hoc/mainLayout";
import Home from "./pages/home";
import { useAppSelector } from "./store";
import Profile from "./pages/profile/profile";
import HomeHeader from "./pages/home/header/HomeHeader";
import { useAppDispatch } from "./store";
import { isAuth } from "./store/actions/auth-actions";
import { Spinner } from "./utills/spinner";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const user = useAppSelector((state) => state.auth);
  console.log(user.isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isAuth()).then((res) => setIsLoading(false));
  }, []);
  if (!isLoading) {
    return (
      <BrowserRouter>
        {user.isAuth && <HomeHeader />}
        <MainLayout>
          <Routes>
            {user.isAuth && <Route path="/home" element={<Home />} />}
            {user.isAuth && (
              <Route path="/profile/:_id" element={<Profile />} />
            )}
            {!user.isAuth && <Route path="*" element={<Login />} />}
          </Routes>
        </MainLayout>
      </BrowserRouter>
    );
  } else return <Spinner />;
};

export default App;
