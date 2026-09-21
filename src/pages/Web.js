import React, { useEffect, useRef } from "react";

import "./Web.scss";
import terraShot from "../resources/computer-science/site-terra.webp";
import resumesmithyShot from "../resources/computer-science/site-resumesmithy.webp";
import owezShot from "../resources/computer-science/site-owez.webp";
import tiptShot from "../resources/computer-science/site-tipt.webp";
import iconShot from "../resources/computer-science/site-openforanicon.webp";
import airtabShot from "../resources/computer-science/site-airtab.webp";
import maximusShot from "../resources/computer-science/site-maximus.webp";
import dylandalalShot from "../resources/computer-science/site-dylandalal.webp";
import feelgoodchiroShot from "../resources/computer-science/site-feelgoodchiro.webp";
import chiroBefore from "../resources/computer-science/web/feelgoodchiro-before.webp";
import chiroAfter from "../resources/computer-science/web/feelgoodchiro-after.webp";

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
    screenshot: terraShot,
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
    screenshot: resumesmithyShot,
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
    screenshot: owezShot,
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
    screenshot: tiptShot,
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
    screenshot: iconShot,
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
    screenshot: airtabShot,
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
    screenshot: maximusShot,
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
    screenshot: dylandalalShot,
    span: "standard",
    accent: "#ec4899",
  },
  {
    name: "Feel Good Chiropractic",
    url: "https://feelgoodchiro.net",
    year: "2026",
    role: "Design · Build",
    description:
      "Marketing site for a Tampa chiropractic practice. Condition and service pages built for local search, a full Spanish translation, and booking wired throughout.",
    tech: ["Next.js", "React"],
    screenshot: feelgoodchiroShot,
    span: "standard",
    accent: "#ffafcc",
  },
];

const processSteps = [
  {
    num: "01",
    title: "What's right for your brand",
    body: "We work together to figure out what the site needs to do and who it's for. I'll draft a mockup before any code gets written.",
  },
  {
    num: "02",
    title: "Built with intention",
    body: "I'll pick the right tools for the project, balancing performance, style, and ease of use for your situation.",
  },
  {
    num: "03",
    title: "Always accessible",
    body: "Expect continued support after launch. I'll provide video and written docs so your team can keep things running without me.",
  },
];

const chiroPalette = [
  { name: "Sky", hex: "#C5DCFA" },
  { name: "Lavender", hex: "#EADEF0" },
  { name: "Blush", hex: "#FEE3EE" },
  { name: "Sunset", hex: "#FFAFCC" },
  { name: "Dusk", hex: "#353349" },
];

const chiroStory = [
  {
    title: "Where it started",
    body: "The old site was a stock template: a grayscale hero photo, mustard buttons, a charcoal slab of welcome text, and an accessibility pop-up parked on top of the headline. None of it felt like the office it was for.",
  },
  {
    title: "A brand we built together",
    body: "I worked with the client to find a calmer identity before touching any code. We landed on something tranquil and warm, reminiscent of a Florida sunset: sky blue melting into pink and lavender, soft rounded type, and one line to carry it all. Get back to feeling good.",
  },
  {
    title: "What shipped",
    body: "A Next.js site with a page for every condition and service, written for local search. A complete Spanish translation. Booking within reach from anywhere on the site.",
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
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: "top" }}
          />
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

function SiteFrame({ label, note, src, width, height, alt }) {
  return (
    <figure className="cs__pane">
      <figcaption className="cs__pane-label">
        <span>{label}</span>
        <span className="cs__pane-note">{note}</span>
      </figcaption>
      <div className="cs__browser">
        <span className="cs__chrome" aria-hidden="true"><i /><i /><i /></span>
        <div className="cs__frame">
          <img src={src} alt={alt} width={width} height={height} decoding="async" />
        </div>
      </div>
    </figure>
  );
}

function ChiroCaseStudy() {
  const scrollRef = useRef(null);

  // Both full-page captures pan top → bottom while the stage is pinned.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = Math.max(rect.height - window.innerHeight, 1);
      const prog = Math.max(0, Math.min(-rect.top / travel, 1));
      el.style.setProperty("--p", prog.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="cs">
      <div className="section-rule section-rule--spaced">
        <span className="section-rule__label">Case Study: Feel Good Chiro</span>
        <span className="section-rule__line" />
        <span className="section-rule__count">Rebrand + Rebuild</span>
      </div>

      <div className="cs__intro">
        <h2 className="cs__title">
          Getting back to
          <br />
          feeling good.
        </h2>
        <div className="cs__lede">
          <p>
            Feel Good Chiropractic is a Tampa practice built on personal, unhurried care.
            Its website said none of that. I worked with the client to rebuild it from
            the brand up.
          </p>
          <dl className="cs__meta">
            <div>
              <dt>Scope</dt>
              <dd>Brand · Design · Build</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>Next.js · React</dd>
            </div>
            <div>
              <dt>Live</dt>
              <dd>
                <a href="https://feelgoodchiro.net" target="_blank" rel="noopener noreferrer">
                  feelgoodchiro.net
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="cs__scroll" ref={scrollRef}>
        <div className="cs__stage">
          <div className="cs__panes">
            <SiteFrame
              label="Before"
              note="Stock template"
              src={chiroBefore}
              width={1200}
              height={5324}
              alt="Full-page capture of the old Feel Good Chiropractic homepage"
            />
            <SiteFrame
              label="After"
              note="New brand + build"
              src={chiroAfter}
              width={1200}
              height={9176}
              alt="Full-page capture of the redesigned Feel Good Chiropractic homepage"
            />
          </div>
          <div className="cs__progress" aria-hidden="true"><span /></div>
        </div>
      </div>

      <div className="cs__story">
        <div className="cs__brand">
          <p className="cs__brand-line">Get back to feeling good.</p>
          <ul className="cs__swatches">
            {chiroPalette.map((c) => (
              <li key={c.hex}>
                <span className="cs__chip" style={{ background: c.hex }} />
                <span className="cs__chip-name">{c.name}</span>
                <span className="cs__chip-hex">{c.hex}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="cs__notes">
          {chiroStory.map((n) => (
            <div className="cs__note" key={n.title}>
              <h3>{n.title}</h3>
              <p>{n.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
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

      {/* CASE STUDY */}
      <ChiroCaseStudy />

      {/* PROCESS */}
      <section className="process">
        <div className="section-rule section-rule--spaced">
          <span className="section-rule__label">The Process</span>
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
