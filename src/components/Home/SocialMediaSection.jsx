import React from "react";
import instagram from "../../assets/images/social-media-icons/instagram.png";
import linkedIn from "../../assets/images/social-media-icons/linkedin.png";
import youtube from "../../assets/images/social-media-icons/youtube.png";
import medium from "../../assets/images/social-media-icons/medium.svg";
import ShinyText from "../ReactBits/ShinyText";
import MagnetLines from "../ReactBits/MagnetLines";

const SocialMediaSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-black overflow-hidden">
      {/* Top-left MagnetLines */}
      <div className="absolute top-0 left-0 z-10 p-10">
        <MagnetLines
          rows={6}
          columns={10}
          containerSize="20vmin"
          lineColor="white"
          lineWidth="0.3vmin"
          lineHeight="3vmin"
          baseAngle={0}
        />
      </div>
      {/* Bottom-right MagnetLines */}
      <div className="absolute bottom-0 right-0 z-10 p-10">
        <MagnetLines
          rows={6}
          columns={10}
          containerSize="20vmin"
          lineColor="white"
          lineWidth="0.3vmin"
          lineHeight="3vmin"
          baseAngle={0}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full w-full gap-8">
        <div className="logos flex justify-center gap-8">
          <a
            href="#"
            target="_blank"
            className="transition-all invert hover:-translate-y-1"
          >
            <img src={instagram} alt="Instagram" className="h-10" />
          </a>
          <a
            href="#"
            target="_blank"
            className="transition-all invert hover:-translate-y-1"
          >
            <img src={youtube} alt="YouTube" className="h-10" />
          </a>
          <a
            href="#"
            target="_blank"
            className="transition-all invert hover:-translate-y-1"
          >
            <img src={linkedIn} alt="LinkedIn" className="h-10" />
          </a>
          <a
            href="#"
            target="_blank"
            className="transition-all invert hover:-translate-y-1"
          >
            <img src={medium} alt="Medium" className="h-10 w-24" />
          </a>
        </div>
        <div className="text-6xl mt-6">
          <ShinyText
            text="Lets Connect !"
            disabled={false}
            speed={2}
            className="caveat"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSection;
