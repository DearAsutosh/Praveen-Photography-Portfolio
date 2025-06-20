import { useRef } from "react";
import Crosshair from "../ReactBits/Crosshair";

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
      className="w-3/4 border border-gray-700 rounded-lg p-5 m-16  flex flex-col items-center justify-center text-center"
    >
      {/* Crosshair will only show inside this 300px-tall container */}
      <Crosshair containerRef={containerRef} color="#ffffff" />
      <a href="/gallery" className="text-white lg-font hover:text-pink-600 inline text-7xl">Click to Visit Gallery !</a>
      <br />
      <div className="caveat text-4xl text-gray-500 tracking-widest">( hover the text and see magic 🔮)</div>
    </div>
  );
};

export default CrossHairSection;
