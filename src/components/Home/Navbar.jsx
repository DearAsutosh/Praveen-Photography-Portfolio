import React from "react";
import Magnet from "../ReactBits/Magnet";
import StarBorder from "../ReactBits/StarBorder";
import logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-black flex items-center justify-between text-white py-5 px-10 z-20 relative">
        <Link to="/">
          <img src={logo} alt="Praveen logo" className="h-20 w-20" />
        </Link>
        <div className="nav-elems md:flex gap-5 hidden">
          <Link
            to="/"
            className="sml-font text-lg transition-all tracking-widest py-2"
          >
            <Magnet
              padding={60}
              disabled={false}
              magnetStrength={10}
              innerClassName="px-4 py-2 rounded-lg  text-white font-semibold "
            >
              <StarBorder
                as="button"
                className="bg-transparent"
                color="cyan"
                speed="3s"
              >
                HOME
              </StarBorder>
            </Magnet>
          </Link>

          <Link
            to="/about"
            className="sml-font text-lg transition-all tracking-widest py-2"
          >
            <Magnet
              padding={60}
              disabled={false}
              magnetStrength={10}
              innerClassName="px-4 py-2  text-white font-semibold "
            >
              <StarBorder
                as="button"
                className="custom-class"
                color="cyan"
                speed="3s"
              >
                ABOUT
              </StarBorder>
            </Magnet>
          </Link>
          <Link
            to="/gallery"
            className="sml-font text-lg transition-all tracking-widest py-2"
          >
            <Magnet
              padding={60}
              disabled={false}
              magnetStrength={10}
              innerClassName="px-4 py-2 font-semibold "
            >
              <StarBorder
                as="button"
                className="custom-class"
                color="cyan"
                speed="3s"
              >
                GALLERY
              </StarBorder>
            </Magnet>
          </Link>
          <Link
            to="/contact"
            className="sml-font text-lg transition-all tracking-widest py-2"
          >
            <Magnet
              padding={60}
              disabled={false}
              magnetStrength={10}
              innerClassName="px-4 py-2 font-semibold "
            >
              <StarBorder
                as="button"
                className="custom-class"
                color="cyan"
                speed="3s"
              >
                CONTACT
              </StarBorder>
            </Magnet>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
