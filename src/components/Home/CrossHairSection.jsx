import { useRef } from "react";
import Crosshair from "../ReactBits/Crosshair";
import { Link } from "react-router-dom";
import ShinyText from "../ReactBits/ShinyText";

const CrossHairSection = () => {
      const containerRef = useRef(null);
  return (
    <div
      ref={containerRef}
      style={{
        height: "500px",
        overflow: "hidden",
        position: "relative",
      }}
      className="w-5/6 border border-gray-700 rounded-lg p-5 m-16  flex flex-col items-center justify-center text-center"
    >
      {/* Crosshair will only show inside this 300px-tall container */}
      <Crosshair containerRef={containerRef} color="#ffffff" />
      <Link to="/gallery" className=""><ShinyText
          text="Click to Visit Gallery !"
          disabled={false}
          speed={1}
          className="lg-font hover:text-pink-600 inline text-7xl "
        /></Link>
      <br />
      <div className="caveat text-4xl text-gray-500 tracking-widest">( click the text and see magic 🔮)</div>
    </div>
  );
};

export default CrossHairSection;
