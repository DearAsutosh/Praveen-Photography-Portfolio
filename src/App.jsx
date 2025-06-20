import SplashCursor from "./components/ReactBits/SplashCursor";
import Navbar from "./components/Home/Navbar";
import AppRoutes from "./routes/AppRoutes";
import ReactLenis from "lenis/react";

const App = () => {
  return (
    <>
      <ReactLenis root>
        {/* <SplashCursor/> */}
        <Navbar />
        <AppRoutes />
      </ReactLenis>
    </>
  );
};

export default App;
