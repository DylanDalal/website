import React, { useState, useEffect } from 'react';
import Radium, { StyleRoot } from 'radium';
import './Navbar.scss';
import FadeDiv from './FadeDiv';
import pluralize from 'pluralize';

function Navbar({ onSelectPage, selectedPage }) {
    const [texts, setTexts] = useState(['Blog', 'Film', 'Story', 'Tech', 'Art']);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        // Update the displayed page in Navbar when selectedPage changes
        if (texts.includes(selectedPage)) {
            const newTexts = [...texts];
            const selectedIndex = newTexts.indexOf(selectedPage);
            newTexts[selectedIndex] = texts[2];
            newTexts[2] = selectedPage;
            setTexts(newTexts);
        }
    }, [selectedPage]);

    const handleElementClick = (index) => {
        const newTexts = [...texts];
        newTexts[index] = texts[2];
        newTexts[2] = texts[index];
        setTexts(newTexts);
        onSelectPage(newTexts[2]);
    };

    const myStoryString = `Welcome! My name is Dylan Dalal, a recently graduated software engineer and amateur filmmaker.
    You can navigate to my blog and portfolios by clicking the words above or scroll down to read my story.`;

    const myFilms = `I had always loved movies as a child, and I started making films using the first iPhone when I was
    six. Scroll down to view my complete portfolio.`;

    const myTech = `My fascination with technology started with a LEGO Mindstorms set when I was seven years old. I
    shifted to building real computers and playing with software about four years after. Scroll down to view the
    projects I've worked on.`;

    const myBlog = `Blog coming soon, sorry for the mess!`;
    const myArt = `Art coming soon, sorry for the mess!`;

    const dict = new Map();
    dict.set('Blog', myBlog);
    dict.set('Film', myFilms);
    dict.set('Story', myStoryString);
    dict.set('Tech', myTech);
    dict.set('Art', myArt);

    return (
        <StyleRoot>
            <div style={{ width: '100%', height: '250vh'}}>
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
                                    <FadeDiv
                                        key={index}
                                        text={displayText}
                                        className={index === 2 ? "header" : "unused"}
                                        onClick={() => handleElementClick(index)}
                                    />
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
