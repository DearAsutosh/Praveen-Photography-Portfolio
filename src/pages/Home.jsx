import LandingHero from "../components/Home/LandingHero"
import CrossHairSection from "../components/Home/CrossHairSection";
const Home = () => {
  return (
    <>
      
        <div className="flex flex-col items-center justify-center w-full">
          <LandingHero />
          <CrossHairSection />
        </div>
    </>
  );
};

export default Home;
