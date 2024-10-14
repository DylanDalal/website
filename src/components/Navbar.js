import React, { useRef, useState, useEffect } from 'react';
import Radium, { StyleRoot } from 'radium';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import ParticleConfig from "../config/particle-config";
import TextTransition, { presets } from 'react-text-transition';
import './Navbar.scss';
import Aos from "aos";
import "aos/dist/aos.css";
import FadeDiv from './FadeDiv';
import pluralize from 'pluralize';


function Navbar({ onSelectPage }) {
    const [texts, setTexts] = useState(['Blog', 'Film', 'Story', 'Tech', 'Art']);
    const [fade, setFade] = useState(false);

    const handleElementClick = (index) => {
        const newTexts = [...texts];
        newTexts[index] = texts[2];
        newTexts[2] = texts[index];
        setTexts(newTexts);
        onSelectPage(newTexts[2]);
    };

    useEffect(() => {
        setFade(false); // Trigger fade out when texts[2] changes
    }, [texts[2]]);

    const myStoryString = `Welcome! My name is Dylan Dalal, a recently graduated software engineer and amateur filmmaker.
    You can navigate to my blog and portfolios by clicking the words above or scroll down to read my story.`

    const myFilms = `I had always loved movies as a child, but I didn't start making films until my dad got an iPhone
    when I was six. Scroll down to view my reels and complete portfolio.`

    const myTech = `My fascination with technology started with a LEGO Mindstorms set when I was seven years old. I
    shifted to building real computers and playing with software about four years after. Scroll down for my projects
    or click here for my resume.`

    const myBlog = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut egestas nisi ac mi feugiat aliquet.
    Quisque euismod lectus at aliquet cursus. Aliquam lobortis metus in tortor faucibus.`

    const myArt = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porttitor sem eu neque vehicula,
    eget condimentum lectus commodo. Aenean vitae ligula vel elit placerat rutrum non ac nulla. Mauris porta.`

    const dict = new Map();
    dict.set('Blog', myBlog);
    dict.set('Film', myFilms);
    dict.set('Story', myStoryString);
    dict.set('Tech', myTech);
    dict.set('Art', myArt);

    return (
        <StyleRoot>
            <div style={{ width: '100%', height: '250vh'}}>
                <Particles params={ParticleConfig}/>
                <div className="page">
                    <div style={{
                        display: "flex",
                         width: "100%",
                         height: "100%",
                         alignItems: "center",
                         justifyContent: "center"}}>
                        <div className="header">Dylan Dalal</div>
                    </div>
                </div>
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
                        <div>
                            <div className="grid-container">
                                {texts.map((text, index) => {
                                    const isHeader = index === 2;
                                    const displayText = isHeader
                                        ? text === "Film"
                                            ? `My ${pluralize(text, 2)}`
                                            : `My ${text}`
                                        : text;
                                    return (
                                    <>
                                        <FadeDiv
                                            key={index}
                                            text={displayText}
                                            className={index === 2 ? "header" : "unused"}
                                            onClick={() => handleElementClick(index)}
                                        />
                                    </>
                                    );
                                })}
                            </div>
                        </div>
                        <div style={{textAlign: "center", flexDirection: "column", width: "50vw"}}>
                            <FadeDiv text={dict.get(texts[2])} className="textStyle" style={{ opacity: fade ? 0 : 1 }}/>
                        </div>
                    </div>
                </div>
            </div>
        </StyleRoot>
    );
}

export default Radium(Navbar);