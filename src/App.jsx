
import SplashCursor from "./components/ReactBits/SplashCursor";
import Navbar from "./components/Home/Navbar";
import AppRoutes from "./routes/AppRoutes";
import ReactLenis from "lenis/react";
import AnimatedCursor from "./components/cursor/AnimatedCursor";


const App = () => {
  
  return (
    <>
      <ReactLenis root>
        <AnimatedCursor />
        {/* <SplashCursor/> */}
        <Navbar />
        <AppRoutes />
      </ReactLenis>
    </>
  );
};

export default App;
