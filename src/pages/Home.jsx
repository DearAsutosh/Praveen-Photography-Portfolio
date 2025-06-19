import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import LandingHero from "../components/Home/LandingHero";
import SplashCursor from "../components/ReactBits/SplashCursor";
import ReactLenis from "lenis/react";

const Home = () => {
  return (
    <>
      <ReactLenis root>
        {/* <SplashCursor /> */}
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full">
          <LandingHero />
          
        </div>
      </ReactLenis>
    </>
  );
};

export default Home;
