import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Navbar       from "./Navbar.js";
import StickyNavbar from "./Sticky.js";
import Footer       from "./Footer.js";
import Particles    from "react-tsparticles";
import ParticleConfig from "../config/particle-config";

export default function MainLayout() {
  const location   = useLocation();
  const contentRef = useRef(null);

  /* -------- auto-scroll whenever the route inside MainLayout changes ---- */
  useEffect(() => {
    const isHome = location.pathname === "/";
    const y      = isHome ? 0 : window.innerHeight * 1.45; // 150 vh
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      {/* hero navbar only for main pages */}
      <div style={{zIndex: "4"}}>
      <Navbar />
      </div>
      {/* shared chrome */}
      <div style={{zIndex: "-1"}}>
        <Particles params={ParticleConfig} />
      </div>
      <StickyNavbar />

      {/* actual page content */}
      <div ref={contentRef} className="page-content">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
