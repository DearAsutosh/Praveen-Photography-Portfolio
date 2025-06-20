import React from "react";
import Home from "./pages/Home";
import SplashCursor from "./components/ReactBits/SplashCursor";
import Navbar from "./components/Home/Navbar";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      {/* <SplashCursor/> */}
      <Navbar />
      <AppRoutes />
    </>
  );
};

export default App;
