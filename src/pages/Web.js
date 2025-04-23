import React from "react";
import SitePreview from "../components/SitePreview";

import "./Web.scss";
import javascript from '../resources/computer-science/javascript.png';
import html from '../resources/computer-science/html.png';
import react from '../resources/computer-science/react.png';
import framer from '../resources/computer-science/framer.png';

import kofskyShot from "../resources/computer-science/website_5.jpg";

const logos = {
  React: react,
  JavaScript: javascript,
  HTML: html,
  Framer: framer,
};

/* project definitions */
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
      "Dynamic media‑company site in Framer featuring sleek transitions and interactive components.",
    tech: ["Framer", "React"],
    embed: "https://airtabmedia.com",
  },
  {
    name: "Dylandalal.com",
    url: "https://dylandalal.com",
    description:
      "Hand‑coded portfolio (React) focused on performance, accessibility, and custom design.",
    tech: ["HTML", "JavaScript", "React"],
    embed: "https://dylandalal.com",
  },
  {
    name: "Kofsky Law Office",
    url: "https://kofskylawoffice.com",
    description:
      "Straightforward law‑office presence built in GoDaddy Website Builder — clean and accessible.",
    tech: ["GoDaddy"],
    embed: null, // blocked – will use scroll preview
  },
];

export default function Web() {
  return (
    <section className="web-exp">
      <header className="web-exp__header">
        <h1  style={{margin: "3vh 0 0 0"}}>Web Development Portfolio</h1>
        <p style={{margin: "0 0 3vh 0"}}>
          A snapshot of sites I’ve built — spanning custom React code, Framer
          prototypes, and GoDaddy builders.
        </p>
      </header>

      {projects.map((p) => (
        <article key={p.url} className="web-card">
          <div className="web-card__preview">
            {p.embed ? (
              <SitePreview
                src={p.embed}
                title={p.name}
                width={320}
                height={180}
              />
            ) : (
              <div className="scroll-preview">
                <img src={kofskyShot} alt={`${p.name} preview`} />
              </div>
            )}
          </div>

          <div className="web-card__body">
            <div className="tech-logos" style={{justifyContent: "left"}}>
              {p.tech.map(
                (t) =>
                  logos[t] && (
                    <img
                      key={t}
                      src={logos[t]}
                      alt={t}
                      className="tech-logo"
                    />
                  )
              )}
            </div>

            <h2 className="web-card__title">{p.name}</h2>
            <p className="web-card__desc">{p.description}</p>

            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="web-card__link"
            >
              Visit live site →
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
