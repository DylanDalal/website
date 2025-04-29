import React, { useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import SitePreview from "../components/SitePreview";
import ParticleConfig from "../config/particle-config";
import bgCode from '../components/bgCode.js';
import bgLorem from '../components/loremipsum.js';

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
};

const projects = [
  {
    name: "Open For An Icon",
    url: "https://openforanicon.com",
    description:
      `Engaging website built for a tech startup's music industry contest. Needed to efficiently convey contest information
      to both interested artists and potential voters. Features graphic design, video editing, 3D animation, and branding
      created entirely by me.`,
    tech: ["Framer", "React"],
    embed: "https://static-fade-239041.framer.app/",
  },
  {
    name: "AirTab Media",
    url: "https://airtabmedia.com",
    description:
      `Engaging launch page for an umbrella tech startup. Needed to clearly convey the company's wide and complex range
      of products to potential investors. I created all of the graphics and planned the webflow.`,
    tech: ["Framer", "React"],
    embed: "https://airtabmedia.com",
  },
  {
    name: "Dylandalal.com",
    url: "https://dylandalal.com",
    description:
      `Hand-coded portfolio (React) focused on performance, search engine optimization, and unique design. My initial
      goal was to build a website that never refreshed between pages, but as the scope increased, I've had to build
      spinoff pages (like this) for a more streamlined user experience.`,
    tech: ["HTML", "JavaScript", "React"],
    embed: "https://dylandalal.com",
  },
  {
    name: "Kofsky Law Office",
    url: "https://kofskylawoffice.com",
    description:
      `Straightforward law-office webpage built to be easily understood and accessible.`,
    tech: ["GoDaddy"],
    embed: null, // will use static screenshot
  },
];

const introTiles = [
    {
      id: 1,
      size: "wide",                     // spans 2 columns
      content: (
        <div   style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",   // top-align vertically
                alignItems: "flex-start",       // left-align horizontally
                textAlign: "left",               // make the text itself flush left
                width: "100%",               // <-- force to fill horizontally
                height: "100%",
              }}>
          <h2>Hello, I’m Dylan Dalal</h2>
          <p>
            Welcome to my web development portfolio!
          </p>
        </div>
      ),
    },
    {
      id: 2,
      size: "tall",                     // spans 2 rows
      content: (
        <blockquote>
          I build websites with clear, coherent messaging and a strong focus on brand identity.
        </blockquote>
      ),
    },
    {
      id: 3,
      size: "square",
      content: <img src={reactLogo} alt="React" />,
    },
    {
      id: 4,
      size: "square",
      content: <img src={framer} alt="Framer" />,
    },
    {
      id: 5,
      size: "wide",
      content: (
        <p>
          Recent obsessions: three.js, motion-based onboarding flows,
          and leveraging AI to speed up VFX pipelines.
        </p>
      ),
    },
  ];

function WebCard({ project }) {
  const revealRef = useReveal();

useEffect(() => {
  const parallaxBlocks = document.querySelectorAll('[data-parallax]');
  if (!parallaxBlocks.length) return;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    parallaxBlocks.forEach(block => {
      block.style.transform = `translateY(${scrollY * 0.4}px)`;
    });
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

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
                <img key={t} src={logos[t]} alt={t} className="tech-logo" style={{opacity: ".8", maxWidth: "70px"}} />
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

      {/* –––––– INTRO GRID + BACKGROUND CODE –––––– */}
      <section className="intro">
        {/* light blue background code block */}
        <div id="bg-code">
          <div className="intro__bg-code" data-parallax style={{ right: "6vw", top: "4vh" }}>
            {bgCode}
          </div>
          <div className="intro__bg-code" data-parallax style={{ right: "50vw", top: "55vh", width: "900px", textWrap: "wrap" }}>
            {bgLorem}
          </div>
        </div>

        {/* your foreground grid */}
        <div className="grid-wrapper">
          <div className="intro-grid">
            {introTiles.map((tile) => (
              <div key={tile.id} className={`tile tile--${tile.size}`}>
                {tile.content}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* –––––– PARTICLES + HEADER –––––– */}
      <Particles className="web-exp__particles" params={ParticleConfig} />

      <header className="web-exp__header">
        <h1 style={{ margin: "3vh 0 0" }}>Web Development Portfolio</h1>
        <p style={{ margin: "0 0 3vh" }}>
          Scroll on the website thumbnail for a preview.
        </p>
      </header>

      {/* –––––– WEBSITE CAROUSEL –––––– */}
      <div className="outer-wrapper">
        <div className="scroll-container">
          <div className="web-exp__carousel">
            {projects.map((p) => (
              <WebCard key={p.url} project={p} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

