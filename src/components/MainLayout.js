import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import StickyNavbar from "../components/Sticky";
import Footer from "../components/Footer";
import Particles from "react-tsparticles";
import ParticleConfig from "../config/particle-config";

export default function MainLayout() {
  return (
    <>
      <div className="particles-background">
        <Particles params={ParticleConfig} />
      </div>

      <Navbar />
      <StickyNavbar />

      <div className="page-content">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
