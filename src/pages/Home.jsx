import LandingHero from "../components/Home/LandingHero";
import ReactLenis from "lenis/react";
import CrossHairSection from "../components/Home/CrossHairSection";
const Home = () => {
  return (
    <>
      <ReactLenis root>
        <div className="flex flex-col items-center justify-center w-full">
          <LandingHero />
          <CrossHairSection />
        </div>
      </ReactLenis>
    </>
  );
};

export default Home;
