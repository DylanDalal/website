import StickyNavbar from "./Sticky.js";
import Footer from "./Footer.js";
import Particles from "react-tsparticles";
import ParticleConfig from "../config/particle-config";
import { Outlet } from "react-router-dom";

export default function CoreLayout() {
  return (
    <>

      <StickyNavbar />      {/* shown on every route */}
      <div className="page-content">
        <Outlet />          {/* child page renders here */}
      </div>
      <Footer />           {/* shown on every route */}
    </>
  );
}
