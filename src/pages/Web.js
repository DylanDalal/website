import React, { useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import SitePreview from "../components/SitePreview";
import ParticleConfig from "../config/particle-config";
import bgCode from '../components/bgCode.js';
import bgLorem from '../components/loremipsum.js';

import "./Web.scss";
import "./Film.css";

import javascript from "../resources/computer-science/javascript.png";
import html       from "../resources/computer-science/html.png";
import reactLogo  from "../resources/computer-science/react.png";
import framer     from "../resources/computer-science/framer.png";
import kofskyShot from "../resources/computer-science/website_5.jpg";
import wireframes from "../resources/computer-science/wireframes.png";
import wireframe2 from "../resources/computer-science/wireframes2.png";
import wireframe3 from "../resources/computer-science/wireframes3.png";

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
    name: "TIPT",
    url: "http://tipt.co/",
    description:
      `Custom webapp that allows users to build profiles to house their mobile payment service links for easier tipping. Full analytics service and Stripe integration available to users.`,
    tech: ["HTML", "JavaScript", "React"],
    embed: "http://tipt.co/",
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
      `Straightforward law office webpage built to be easily understood and accessible.`,
    tech: ["JavaScript"],
    embed: null, // will use static screenshot
  },
];

const introTiles = [
    {
      id: 1,
      size: "wide",                     // spans 2 columns
      content: (
        <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                textAlign: "left",
                width: "100%",
                height: "100%",
              }}>
          <h2>WEB PORTFOLIO</h2>
          <p>
          </p>
        </div>
      ),
    },
    {
      id: 2,
      size: "tall",
      content: (
         <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            textAlign: "left",
            width: "100%",
            height: "100%",
          }}>
            <blockquote style={{marginBottom: "1.1em"}}>
              Hi, I'm Dylan Dalal. I'm a software engineer and graphic designer.
            </blockquote>

            <blockquote>
              I build websites with clear, coherent messaging and a strong focus on brand identity.
            </blockquote>
         </div>
      ),
    },
    {
      id: 3,
      size: "square",
      content: <img src={framer} alt="Dylan Dalal uses Framer" />,
    },
    {
      id: 4,
      size: "square",
      content: <img src={reactLogo} alt="Dylan Dalal uses React" />,
    },
    {
      id: 4,
      size: "square",
      content: <img src={framer} alt="Dylan Dalal uses Framer" />,
    },
    {
      id: 5,
      size: "wide",
      content: (
             <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            textAlign: "left",
            width: "100%",
            height: "100%",
          }}>
        <blockquote>
          Scroll to see my work and process.
        </blockquote>
        </div>
      ),
    },
    {
      id: 6,
      size: "square",
      content: (
        <blockquote>
            CONTACT
        </blockquote>
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

const trackRef = useRef(null);
const imgRefs = useRef([]);

    useEffect(() => {
      const speeds = [0.9, 1.5];
      const onScroll = () => {
        const rect = trackRef.current?.getBoundingClientRect();
        if (!rect) return;
        const winH = window.innerHeight;
        const prog = Math.max(0, Math.min((winH - rect.top) / (winH + rect.height), 1));
        const baseShift = 120;

        imgRefs.current.forEach((img, i) => {
          if (img) {
            img.style.transform = `
              scale(1.05)
              translateY(${prog * baseShift * speeds[i] - 80}px)
            `;
          }
        });
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

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

      <header className="web-exp__header">
        <h1 style={{ margin: "3vh 0" }}>Work With Me</h1>
      </header>

    <div className="column-container" style={{ gap: '5vw', minHeight: '50vh', paddingBottom: '0', paddingTop: "13vh"}}>
        <div style={{ display: "flex", flexDirection: "column", width: "35vw"}}>
            <div className="header2_pipeline" style={{ paddingBottom: '10px', color: 'white', width: "40vw"}}>
                1. What's Right For Your Brand.
            </div>
            <div style={{alignItems: "end"}}>
                <div className="body_no_padding" style={{ color: 'white', fontSize: "1.3vw", opacity: .9 }}>
                My process always starts by working with you to build a clear set of goals for your website. I'll
                build wireframes for each page of your website so you can visualize the end product.
            </div>
        </div>
    </div>
    <div
      className="wireframe-pair"
      ref={trackRef}
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        margin: "5vh 0",
      }}
    >
      <div className="wireframe-img-wrap" style={{ zIndex: 2 }}>
        <img
          className="wireframe-img"
          src={wireframe3}
          alt="Wireframe 1"
          ref={(el) => (imgRefs.current[0] = el)}
        />
      </div>
      <div
        className="wireframe-img-wrap"
        style={{
          marginLeft: "-2vw",
          zIndex: 2,
          opacity: 1,
          transform: "scale(1.1)"
        }}
      >
        <img
          className="wireframe-img"
          src={wireframe2}
          alt="Wireframe 2"
          ref={(el) => (imgRefs.current[1] = el)}
        />
      </div>
      <div
        className="wireframe-img-wrap"
        style={{
          marginLeft: "-2vw",
          zIndex: 1,
          opacity: .8,
          transform: "scale(0.95)"
        }}
      >
        <img
          className="wireframe-img"
          src={wireframes}
          alt="Wireframe 2"
          ref={(el) => (imgRefs.current[1] = el)}
        />
      </div>
    </div>
  </div>
  <div className="column-container" style={{ gap: '5vw', minHeight: '50vh', padding: '15vh 0 10vh 0' }}>
        <div style={{ display: "flex", flexDirection: "column", width: "35vw"}}>
            <div className="header2_pipeline" style={{ paddingBottom: '10px', color: 'white', width: "40vw"}}>
                2. Built With Intention.
            </div>
            <div className="body_no_padding" style={{ color: 'white', fontSize: "1.3vw", opacity: .9 }}>
                I use the right tools for the job. From video editing to 3D modeling to complex, motion-driven
                interactions, I'm equipped to elevate your story when it supports the vision, but I never let visuals
                take the stage for the sake of flair. Every animation, texture, and transition has a reason to exist.
            </div>
        </div>
    <div>
    </div>
  </div>
    <div className="column-container" style={{ gap: '5vw', minHeight: '50vh'}}>
        <div style={{ display: "flex", flexDirection: "column", width: "35vw"}}>
            <div className="header2_pipeline" style={{ paddingBottom: '10px', color: 'white', width: "40vw"}}>
                3. Always Accessible.
            </div>
            <div className="body_no_padding" style={{ color: 'white', fontSize: "1.3vw", opacity: .9 }}>
                Every project ships with two months of support for your team and both video and written documentation
                that you can reference forever, without relying exclusively on me.
            </div>
        </div>
    <div>
    </div>
  </div>

    </section>
  );
}

