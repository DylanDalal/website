import React, { useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import SitePreview from "../components/SitePreview";
import ParticleConfig from "../config/particle-config";

import "./Web.scss";

import javascript from "../resources/computer-science/javascript.png";
import html       from "../resources/computer-science/html.png";
import reactLogo  from "../resources/computer-science/react.png";
import framer     from "../resources/computer-science/framer.png";
import kofskyShot from "../resources/computer-science/website_5.jpg";

function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);        // reveal only once
        }
      },
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return ref;
}

/* -------------------------------------------------
   logo lookup
-------------------------------------------------- */
const logos = {
  React: reactLogo,
  JavaScript: javascript,
  HTML: html,
  Framer: framer,
  // "GoDaddy" left undefined → no logo
};

/* -------------------------------------------------
   project meta
-------------------------------------------------- */
const projects = [
  {
    name: "Open For An Icon",
    url: "https://openforanicon.com",
    description:
      "Interactive contest platform built in Framer — rapid prototyping, gorgeous animations.",
    tech: ["Framer", "React"],
    embed: "https://static-fade-239041.framer.app/",
  },
  {
    name: "AirTab Media",
    url: "https://airtabmedia.com",
    description:
      "Dynamic media-company site in Framer featuring sleek transitions and interactive components.",
    tech: ["Framer", "React"],
    embed: "https://airtabmedia.com",
  },
  {
    name: "Dylandalal.com",
    url: "https://dylandalal.com",
    description:
      "Hand-coded portfolio (React) focused on performance, accessibility, and custom design.",
    tech: ["HTML", "JavaScript", "React"],
    embed: "https://dylandalal.com",
  },
  {
    name: "Kofsky Law Office",
    url: "https://kofskylawoffice.com",
    description:
      "Straightforward law-office presence built in GoDaddy Website Builder — clean and accessible.",
    tech: ["GoDaddy"],
    embed: null, // will use static screenshot
  },
];

/* -------------------------------------------------
   child component – one card per project
-------------------------------------------------- */
function WebCard({ project }) {
  const revealRef = useReveal();

  return (
    <article ref={revealRef} className="web-card">
      {/* preview column */}
      <div className="web-card__preview">
        {project.embed ? (
          <SitePreview
            src={project.embed}
            title={project.name}
            width={400}
            height={225}
          />
        ) : (
          <div className="scroll-preview">
            <img src={kofskyShot} alt={`${project.name} preview`} />
          </div>
        )}
      </div>

      {/* copy column */}
      <div className="web-card__body">
        <div className="tech-logos" style={{ justifyContent: "left" }}>
          {project.tech.map(
            (t) =>
              logos[t] && (
                <img key={t} src={logos[t]} alt={t} className="tech-logo" />
              )
          )}
        </div>

        <h2 className="web-card__title" style={{margin: '0', padding: '0'}}>{project.name}</h2>
        <p className="web-card__desc" >{project.description}</p>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="web-card__link"
        >
          Visit live site →
        </a>
      </div>
    </article>
  );
}

/* -------------------------------------------------
   page component
-------------------------------------------------- */
export default function Web() {
  return (
    <section className="web-exp web-exp--gradient">
      {/* local particle layer */}
      <Particles className="web-exp__particles" params={ParticleConfig} />

      <header className="web-exp__header">
        <h1 style={{ margin: "3vh 0 0" }}>Web Development Portfolio</h1>
        <p style={{ margin: "0 0 3vh" }}>
          I build websites with clear, coherent messaging and a strong focus on brand identity.
        </p>
      </header>
      <div style={{width: "95vw", height: "80vh", overflowX: "show", overflowY: "show", padding: "0 0 0 5svw"}}>
          <div className="web-exp__carousel">
              {projects.map((p) => (
                <WebCard key={p.url} project={p} />
              ))}
          </div>
      </div>
    </section>
  );
}
