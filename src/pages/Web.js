import React, { useEffect, useRef } from "react";

import "./Web.scss";
import kofskyShot from "../resources/computer-science/website_5.jpg";

const cohortShot = process.env.PUBLIC_URL + "/cohort.jpg";

const webapps = [
  {
    name: "Terra",
    url: "https://terra.districtcinema.com/",
    year: "2026",
    role: "Design · Build · with District Cinema",
    description:
      "Browser-based 3D viewer for production location planning. Measurements, virtual scouting, and real time collaboration. Designed the Projects page and backend functionality.",
    tech: ["React", "TypeScript", "WebGL"],
    embed: "https://terra.districtcinema.com/",
    span: "featured",
    accent: "#10b981",
  },
  {
    name: "Resumesmithy",
    url: "https://resumesmithy.com/",
    year: "2026",
    role: "Full-stack",
    description:
      "End-to-end resume builder on Cloudflare D1. Auth, billing, generation pipeline, and responsive design.",
    tech: ["React", "TypeScript", "Cloudflare D1"],
    embed: "https://resumesmithy.com/",
    span: "featured",
    accent: "#f59e0b",
  },
  {
    name: "Owez",
    url: "https://owez.me/",
    year: "2026",
    role: "Design + Full-stack",
    description:
      "Full-stack SaaS on Firebase. Brand identity, UX, data model, and product surface.",
    tech: ["React", "TypeScript", "Firebase"],
    embed: "https://owez.me/",
    span: "standard",
    accent: "#8b5cf6",
  },
  {
    name: "CohortNYC",
    url: "https://cohortnyc.com/",
    year: "2024",
    role: "Team · Full-stack",
    description:
      "Agency platform with member profiles, a marketing site, and an admin dashboard for asset management.",
    tech: ["React", "TypeScript"],
    embed: null,
    screenshot: cohortShot,
    span: "standard",
    accent: "#ef4444",
  },
  {
    name: "TIPT",
    url: "https://tipt.co/",
    year: "2025",
    role: "Build · Integrations",
    description:
      "Profile builder for mobile-payment links. Full analytics dashboard and Stripe integration.",
    tech: ["React", "JavaScript", "Stripe"],
    embed: "https://tipt.co/",
    span: "standard",
    accent: "#00c896",
  },
];

const brandSites = [
  {
    name: "Open For An Icon",
    url: "https://openforanicon.com",
    year: "2024",
    role: "Design · Build · Brand",
    description:
      "Contest platform connecting artists and voters for a music-tech startup. All graphics, video, and 3D made in-house.",
    tech: ["Framer", "React"],
    embed: "https://static-fade-239041.framer.app/",
    span: "featured",
    accent: "#ff6b35",
  },
  {
    name: "AirTab Media",
    url: "https://airtabmedia.com",
    year: "2024",
    role: "Design · Build",
    description:
      "Launch page for a multi-product tech startup. Original graphics and a clear story for investors.",
    tech: ["Framer", "React"],
    embed: "https://airtabmedia.com",
    span: "featured",
    accent: "#6366f1",
  },
  {
    name: "Maximus Productions",
    url: "https://www.maximus.productions",
    year: "2025",
    role: "Design · Build",
    description:
      "Website for a marketing and product development production company.",
    tech: ["React", "JavaScript"],
    embed: "https://www.maximus.productions",
    span: "standard",
    accent: "#f5c842",
  },
  {
    name: "dylandalal.com",
    url: "https://dylandalal.com",
    year: "Ongoing",
    role: "Everything",
    description:
      "You've been here before! React portfolio built for performance and SEO.",
    tech: ["React", "JavaScript"],
    embed: "https://dylandalal.com",
    span: "standard",
    accent: "#ec4899",
  },
  {
    name: "Kofsky Law Office",
    url: "https://kofskylawoffice.com",
    year: "2022",
    role: "Design · Build",
    description:
      "Law office website designed for clarity and accessibility. Clean, straightforward structure.",
    tech: ["JavaScript"],
    embed: null,
    screenshot: kofskyShot,
    span: "standard",
    accent: "#94a3b8",
  },
];

const processSteps = [
  {
    num: "01",
    title: "What's right for your brand",
    body: "We figure out what the site needs to do and who it's for. Wireframes and a sitemap before any code gets written.",
  },
  {
    num: "02",
    title: "Built with intention",
    body: "I pick the tools that fit the project, not the ones that are popular. Every decision has a reason behind it.",
  },
  {
    num: "03",
    title: "Always accessible",
    body: "Continued support after launch. Video and written docs so your team can keep things running without me.",
  },
];

const marqueeItems = [
  "DESIGN",
  "REACT",
  "TYPESCRIPT",
  "FRAMER",
  "FIREBASE",
  "CLOUDFLARE",
  "STRIPE",
  "BRAND IDENTITY",
  "MOTION",
  "3D / WEBGL",
  "ACCESSIBILITY",
];

function FitFrame({ src, title }) {
  const wrapRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const baseW = 1600;
    const baseH = 1000;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const fit = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (!width || !height) return;
      const scale = Math.max(width / baseW, height / baseH);
      if (frameRef.current) {
        frameRef.current.style.width = `${baseW}px`;
        frameRef.current.style.height = `${baseH}px`;
        frameRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="fit-frame">
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        loading="lazy"
        className="fit-frame__iframe"
        scrolling="no"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}

function ProjectTile({ project, index, offset = 0 }) {
  const num = String(index + 1 + offset).padStart(2, "0");

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`tile tile--${project.span}`}
      style={{ "--accent": project.accent }}
    >
      <div className="tile__media">
        {project.embed ? (
          <FitFrame src={project.embed} title={project.name} />
        ) : project.screenshot ? (
          <img src={project.screenshot} alt={`${project.name} screenshot`} style={{ objectPosition: "top" }} />
        ) : null}
        <div className="tile__scrim" />
      </div>

      <div className="tile__topline">
        <span className="tile__role">{project.role}</span>
      </div>

      <div className="tile__body">
        <div className="tile__tags">
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <h3 className="tile__title">{project.name}</h3>
        <p className="tile__desc">{project.description}</p>
        <span className="tile__cta">
          <span>Visit live site</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M3 11L11 3M11 3H5M11 3V9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}

function BentoGrid({ projects, offset = 0 }) {
  return (
    <div className="bento">
      {projects.map((p, i) => (
        <ProjectTile key={p.url} project={p} index={i} offset={offset} />
      ))}
    </div>
  );
}

export default function Web() {
  useEffect(() => {
    document.documentElement.classList.add("web-page--hide-scrollbar");
    return () => document.documentElement.classList.remove("web-page--hide-scrollbar");
  }, []);
  
  return (
    <section className="web2">
      {/* MASTHEAD */}
      <header className="masthead">

        <span className="masthead__name">Dylan Dalal</span>
        <h1 className="masthead__title">
          Fullstack
          <br />
          Web Developer
        </h1>

        <div className="masthead__meta">
          <div>
            <span className="meta-label">ROLE</span>
            <span className="meta-value">Designer & Engineer</span>
          </div>
          <div>
            <span className="meta-label">SPECIALIZATIONS</span>
            <span className="meta-value">Full-stack Apps · Brand Sites</span>
          </div>
          <div>
            <span className="meta-label">STACK</span>
            <span className="meta-value">TypeScript · React · Firebase</span>
          </div>
          <div>
            <span className="meta-label">EXPERIENCE</span>
            <span className="meta-value">CloudFlare D1 · CloudFlare Workers • JavaScript · Framer · Stripe · Firebase</span>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...Array(3)].map((_, loop) => (
            <div key={loop} className="marquee__group">
              {marqueeItems.map((item) => (
                <span key={`${loop}-${item}`} className="marquee__item">
                  {item}
                  <span className="marquee__dot">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* WEBAPPS */}
      <div className="section-rule">
        <span className="section-rule__label">Full-Stack Webapps</span>
        <span className="section-rule__line" />
        <span className="section-rule__count">
          {String(webapps.length).padStart(2, "0")}
        </span>
      </div>
      <BentoGrid projects={webapps} offset={0} />

      {/* BRAND SITES */}
      <div className="section-rule section-rule--spaced">
        <span className="section-rule__label">Brand &amp; Marketing</span>
        <span className="section-rule__line" />
        <span className="section-rule__count">
          {String(brandSites.length).padStart(2, "0")}
        </span>
      </div>
      <BentoGrid projects={brandSites} offset={webapps.length} />

      {/* PROCESS */}
      <section className="process">
        <div className="section-rule section-rule--spaced">
          <span className="section-rule__label">How We Work</span>
          <span className="section-rule__line" />
          <span className="section-rule__count">03 STEPS</span>
        </div>

        <ol className="process__list">
          {processSteps.map((s) => (
            <li className="process__step">
              <span className="process__num">{s.num}</span>
              <div className="process__copy">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2 className="cta__title">
          Let's build something.
        </h2>
        <a className="cta__button" href="mailto:dylanmax@gmail.com">
          <span>Get in touch</span>
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M3 11L11 3M11 3H5M11 3V9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </a>
      </section>
    </section>
  );
}
