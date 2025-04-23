import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Radium, { StyleRoot } from "radium";
import "./Navbar.scss";
import FadeDiv from "./FadeDiv";
import pluralize from "pluralize";

function Navbar() {
  const navigate   = useNavigate();
  const location   = useLocation();

  // Map routes ⇔ page labels
  const pageFromPath = (path) => {
    switch (path) {
      case "/film": return "Film";
      case "/tech": return "Tech";
      case "/blog": return "Blog";
      case "/art":  return "Art";
      default:      return "Story"; // “/”
    }
  };
  const pathFromPage = (page) => {
    switch (page) {
      case "Film":  return "/film";
      case "Tech":  return "/tech";
      case "Blog":  return "/blog";
      case "Art":   return "/art";
      default:      return "/";
    }
  };

  // Texts array that keeps the selected page in the middle (index 2)
  const [texts, setTexts] = useState(["Blog", "Film", "Story", "Tech", "Art"]);
  const [fade,  setFade]  = useState(false);

  // When the route changes, put that page label into slot 2
  useEffect(() => {
    const current = pageFromPath(location.pathname);
    if (texts.includes(current) && texts[2] !== current) {
      setTexts((old) => {
        const copy          = [...old];
        const currentIndex  = copy.indexOf(current);
        [copy[2], copy[currentIndex]] = [copy[currentIndex], copy[2]];
        return copy;
      });
    }
  }, [location.pathname]); // eslint-disable-line

  // Click handler → swap texts & navigate
  const handleClick = (index) => {
    setTexts((old) => {
      const copy = [...old];
      [copy[2], copy[index]] = [copy[index], copy[2]];
      return copy;
    });
    navigate(pathFromPage(texts[index]));
  };

  const blurbs = {
    Blog:  "Blog coming soon, sorry for the mess!",
    Film:  `I started making films using LEGOs and the first iPhone when I was eight. Scroll down to view my modern short film portfolio.`,
    Story: `Welcome! My name is Dylan Dalal, professional software engineer and amateur filmmaker. You
     can navigate to my portfolios by clicking the words above or scroll down to read my story. This website is a WIP,
     sorry for the mess!`,
    Tech:  `My fascination with technology started with a LEGO Mindstorms set when I was seven. I shifted to building
    real computers and about four years after. Scroll down to view the projects I've worked on.`,
    Art:   "Art coming soon, sorry for the mess!",
  };

  return (
    <StyleRoot>
      <div style={{ width: "100%", height: "250vh" }}>
        {/* Hero page ---------------------------------------------------- */}
        <div className="page">
          <div className="centerFlex">
            <div className="header">Dylan Dalal</div>
          </div>
        </div>

        {/* Navigation wheel -------------------------------------------- */}
        <div className="page2">
          <div style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(to bottom, rgba(178,245,246,0) 10%, rgba(0,6,48,1) 80%)",
            justifyContent: "center",
            alignItems: "center",
            opacity: fade ? 0 : 1, // Apply opacity based on fade state
            transition: 'opacity 0.5s', // Apply transition to opacity
            }}
          >
              <div
                className="navWheel"
                style={{
                  opacity: fade ? 0 : 1,
                  transition: "opacity 0.5s",
                }}
              >
                <div className="grid-container">
                  {texts.map((text, i) => {
                    const isHeader = i === 2;
                    const display  = isHeader
                      ? text === "Film"
                        ? `My ${pluralize(text, 2)}`
                        : `My ${text}`
                      : text;

                    return (
                      <FadeDiv
                        key={i}
                        text={display}
                        className={isHeader ? "header" : "unused"}
                        onClick={() => handleClick(i)}
                      />
                    );
                  })}
                </div>

                <div
                  style={{
                    textAlign: "center",
                    width: "50vw",
                    margin: "0 auto",
                  }}
                >
                  <FadeDiv
                    text={blurbs[texts[2]]}
                    className="textStyle"
                    style={{ opacity: fade ? 0 : 1 }}
                  />
                </div>
              </div>
          </div>
        </div>
      </div>
    </StyleRoot>
  );
}

export default Radium(Navbar);
