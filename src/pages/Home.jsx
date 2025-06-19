import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import LandingHero from "../components/Home/LandingHero";
import ReactLenis from "lenis/react";
import { useRef } from "react";
import CrossHairSection from "../components/Home/CrossHairSection";
const Home = () => {
  return (
    <>
      <ReactLenis root>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full">
          <LandingHero />
          <CrossHairSection/>
          
        </div>
      </ReactLenis>
    </>
  );
};

export default Home;
