import LandingHero from "../components/Home/LandingHero"
import CrossHairSection from "../components/Home/CrossHairSection";
import SocialMediaSection from "../components/Home/SocialMediaSection";
const Home = () => {
  return (
    <>
      
        <div className="flex flex-col items-center justify-center w-full">
          <LandingHero />
          <CrossHairSection />
          <SocialMediaSection/>
        </div>
    </>
  );
};

export default Home;
