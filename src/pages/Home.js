import React, {useState} from 'react';
import '../App.css';
import './Home.css';
import './Film.css';
import Gallery from '../components/Gallery';
import FadeDiv from '../components/FadeDiv';
import westchester from '../resources/story/westchester.png';
import florida from '../resources/story/florida.png';
import youtube from '../resources/story/youtube.png';
import games from '../resources/story/games.png';
import iphone from '../resources/story/iphone2.png';
import laptop from '../resources/story/laptop.png';
import fsu from '../resources/story/fsu.png';
import logoClip from '../resources/story/clip.png';
import logoMarz from '../resources/story/marz.png';
import logoCglj from '../resources/story/cglumberjack.png';
import logoPrem from '../resources/story/premise.png';
import { Helmet } from "react-helmet";

const p1 = `I was born in West Chester, a Philadelphia suburb, in March of 2001.`

const pp = `It never snowed while I lived there. But this is what it looked like in my mind.`

const p2 = `We moved to South Florida not long after, to the house that my mom, dad, and brother have lived in ever since.`

const p3 = `My passion for filmmaking and technology began when I was seven as a result of my childhood obsession with LEGOs.`

const p4 = `I used the original iPhone to create LEGO stop-motion animations using an onion-skinning app...`

const p5 = `...and I learned the Adobe suite to make decals for custom figures and to edit YouTube videos.`

const p6 = `I am very fortunate that my family introduced me to traveling and photography early in my life, and they’ve
remained two of my strongest interests.`

const p7 = `Along with my first LEGO Mindstorms NXT set, modding video games and hosting servers sparked my fascination
with programming.`

const p8 = `Though I eventually moved on from making LEGO videos, I’ve continued making YouTube videos as a hobby to
this day, with over 318 uploads to the platform (some are now private).`

const p9 = `I started college at Florida State University in 2019. I wasn’t accepted into the College of Motion Picture
Arts, but I still went there with hopes of transferring into their prestigious Film Production program for my Sophomore
year. I started a degree pursuing my other interest, Computer Science, in the mean time.`

const p10 = `But in 2020, the Covid-19 pandemic hit. The university sent us home. I did not apply for the College of
Motion Picture Arts.`

const p11 = `When we returned to FSU in 2021, I went to the Film School to offer them IT and technical support. They
offered me the first research position at Torchlight Studios, FSU’s new center for teaching innovation in film.
Over the next three years I would help build the technological division, combining my two primary interests.`

const p12 = `In addition to my research, I've worked for four software development companies throughout my career,
three of which were in the entertainment industry.`

const p13 = `In 2024, I left FSU to focus on my role at Premise Entertainment and travel through Europe. I spent four
months exploring sixty European cities across nineteen countries as my contract ended. I am now working on my own
real-time production company while seeking a full-time position at a company that aligns with my interests.`

const logos = [
    { src: logoClip, link: 'https://clipmoney.com/' },
    { src: logoCglj, link: 'https://www.cglumberjack.com/' },
    { src: logoMarz, link: 'https://monstersaliensrobotszombies.com/' },
    { src: logoPrem, link: 'https://premiseentertainment.com/' },
  ];


function Home() {


    return (
        <>
                <Helmet>
                  {/* Title & Description */}
                  <title>Dylan Dalal | Software Engineer, Filmmaker, Artist</title>
                  <meta name="description" content="The personal website of Dylan Dalal, showcasing software engineering projects, short films, and mixed media art." />

                  {/* Open Graph (Facebook, LinkedIn) */}
                  <meta property="og:title" content="Dylan Dalal Portfolio" />
                  <meta property="og:description" content="Explore Dylan Dalal's filmmaking and software engineering portfolios." />
                  <meta property="og:image" content="https://dylandalal.com/favicon.png" />
                  <meta property="og:url" content="https://dylandalal.com/" />
                  <meta property="og:type" content="website" />

                  {/* Twitter Cards */}
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:title" content="Dylan Dalal Portfolio" />
                  <meta name="twitter:description" content="Explore Dylan Dalal's filmmaking and software engineering portfolios" />
                  <meta name="twitter:image" content="https://dylandalal.com/favicon.png" />

                {/* Schema Markup */}
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Dylan Dalal",
                        "url": "https://dylandalal.com",
                        "image": "https://dylandalal.com/profile.jpg",
                        "jobTitle": "Software Engineer & Photographer",
                        "sameAs": [
                            "https://linkedin.com/in/dylandalal",
                            "https://github.com/dylandalal",
                            "https://twitter.com/dylandalal"
                        ]
                    }
                    `}
                </script>
            </Helmet>
            <div className="mission" style={{position: "relative", zIndex: 1}}>
                <div>
                    <FadeDiv
                      className="mission_text" style={{padding: "0"}}
                      text={
                        <>
                          I USE TECHNOLOGY TO<br />
                          ELEVATE CREATIVE PROCESSES—<br />
                          YOURS AND MINE.
                        </>
                      }
                    />
                </div>
                <div className="ticker" style={{zIndex: 2}}>
                  <div className="ticker__move">
                    <span className="ticker__item bodyText">
                      film &nbsp; gaming &nbsp; animation &nbsp; product development &nbsp;
                      company infrastructure &nbsp; brand creation &nbsp;
                    </span>
                    <span className="ticker__item bodyText">
                      film &nbsp; gaming &nbsp; animation &nbsp; product development &nbsp;
                      company infrastructure &nbsp; brand creation &nbsp;
                    </span>
                  </div>
                </div>
                <div style={{padding: "15vh 0vw 0vw 0", width: "100%", textAlign: "right"}}>
                    <FadeDiv
                      className="mission_text"
                      text={
                        <>
                          IN LIFTING YOUR <br />
                          CREATIVITY, I INSPIRE<br />
                          MY OWN.
                        </>
                      }
                    />
                </div>
                <div className="ticker" style={{zIndex: 2}}>
                  <div className="ticker__move">
                    <span className="ticker__item bodyText">
                      filmmaking &nbsp; photography &nbsp; mixed media &nbsp;
                    </span>
                    <span className="ticker__item bodyText">
                      filmmaking &nbsp; photography &nbsp; mixed media &nbsp;
                    </span>
                    <span className="ticker__item bodyText">
                      filmmaking &nbsp; photography &nbsp; mixed media &nbsp;
                    </span>
                  </div>
                </div>
            </div>
            <div className="second_home">
                <p className="bodyText" style={{padding: "10vw"}}>{p3}</p>
            </div>
            <div className="phone_home">
                 <div className="column-container2">
                    <img src={iphone} style={{maxWidth: "60vw"}} alt="Dylan Dalal working on an iphone" />
                    <FadeDiv text={p4} className="bodyText"/>
                </div>
            </div>
            <div className="laptop_home">
                 <div className="column-container2">
                    <img src={laptop} style={{maxWidth: "60vw"}} alt="Dylan Dalal working on a laptop" />
                    <FadeDiv text={p5} className="bodyText"/>
                </div>
            </div>
            <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
                <Gallery />
                <p className="bodyText" style={{
                        position: "absolute", top: "40%", left: "50%", transform: "translate(-60%, -50%)",
                        zIndex: 10, textAlign: "center", textShadow: "2px 2px 1px rgba(0, 0, 0, 0.4)"}}>
                    {p6}
                </p>
            </div>
            <div className="fourth_home" style={{position: "relative", zIndex: 1}}>
                <img src={games} className="games-image" alt="Dylan Dalal's favorite games'" />
                <p className="bodyText" style={{padding: "0 10vw 12vh 10vw"}}>{p7}</p>
            </div>
            <div className="fourth_home" style={{position: "relative", zIndex: 1}}>
                 <div className="column-container">
                    <FadeDiv text={p8} className="bodyText"/>
                    <img src={youtube} style={{height: "70vh", width: "auto"}} alt="Dylan Dalal's YouTube Channel" />
                </div>
            </div>
            <div className="sixth_home" style={{ position: "relative", zIndex: 1 }}>
                <img src={fsu} className="fsu-image" alt="Florida State University where Dylan Dalal attended" />
                <div className="fsu_wrapper">
                    <p className="bodyText">{p9}</p>
                </div>
                <p className="bodyText" style={{padding: "15vh 10vw 3vh 10vw"}}>{p10}</p>
                <p className="bodyText" style={{padding: "0 10vw 0vh 10vw"}}>{p11}</p>
                <p className="bodyText" style={{padding: "0 10vw 0vh 10vw"}}>{p12}</p>
                <div className="logo-row">
                  {logos.map((logo, index) => (
                    <a href={logo.link} key={index} target="_blank" rel="noopener noreferrer">
                      <img src={logo.src} alt={`Dylan Dalal Logo ${index + 1}`} className="logo-image" />
                    </a>
                  ))}
                </div>
                <p className="bodyText" style={{padding: "0 10vw 5vh 10vw"}}>{p13}</p>
            </div>
        </>
    );
}

export default Home;