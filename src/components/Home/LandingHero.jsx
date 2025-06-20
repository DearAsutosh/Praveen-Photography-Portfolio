import profile_pic from "../../images/praveen-pic.png";
import TrueFocus from "../ReactBits/TrueFocus";
import ShinyText from "../ReactBits/ShinyText";
import ScrollFloat from "../ReactBits/ScrollFloat";

const LandingHero = () => {
  return (
    <>
      <div className="py-10  bg-black text-white flex flex-col items-center gap-10">
        <img
          src={profile_pic}
          alt="profile pic"
          className="rounded-full h-40 w-40"
        />

        <div className="lg-font text-8xl">
          <TrueFocus
            sentence="Hi, I'm Praveen."
            manualMode={true}
            blurAmount={7}
            borderColor="rgb(0,213,255)"
            animationDuration={0.5}
            pauseBetweenAnimations={0.3}
          />
        </div>
        <ShinyText
          text="Hover above to see Magic 🪄"
          disabled={false}
          speed={2}
          className="text-2xl sml-font "
        />
      </div>
      <div className="sml-font text-2xl w-2/3 mt-52 text-center min-h-screen md:min-h-[600px] text-white">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="top 90%" 
          scrollEnd="bottom 60%" 
          stagger={0.03}
        >
          I don’t take photos — I frame emotions. With every click, I aim to
          freeze not just time, but feeling. Light, texture, soul — that’s the
          heart of my work. 
        </ScrollFloat>
      </div>
    </>
  );
};

export default LandingHero;
