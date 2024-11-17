import React, {useState} from 'react';
import Radium from 'radium';
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

const p10 = `But in 2020, the Covid-19 Pandemic hit. The university sent us home. I did not apply for the College of
Motion Picture Arts.`

const p11 = `When we returned to FSU in 2021, I went to the Film School to offer them IT and technical support. They
offered me the first research position at Torchlight Studios, FSU’s new center for teaching innovation in film.
Over the next three years I would help build the technological division, combining my two primary interests.`

const p12 = `In addition to my research, I've worked for four software development companies throughout my career,
three of which were in the entertainment industry.`

const p13 = `In 2024, I left FSU to focus on my role at Premise Entertainment and travel through Europe. I spent four
months exploring sixty European cities across nineteen countries as my contract ended. I am now working on my own
real-time production company while seeking a full-time position at a company that aligns with my interests.`


function Home() {


    return (
        <>
            <div className="first_home" style={{padding: "15vh 0 0 0"}}>
                <div className="column-container">
                    <FadeDiv text={p1} className="bodyText"/>
                    <img src={westchester} className="image-style"/>
                </div>
            </div>
            <div className="first_home" style={{position: "relative", padding: "2vh 0 0 0"}}>
                <div>
                    <div className="column-container">
                        <FadeDiv text={p2} className="bodyText"/>
                        <img src={florida} className="image-style"/>
                    </div>
                </div>
            </div>
            <div className="second_home">
                <p className="bodyText" style={{padding: "10vw"}}>{p3}</p>
            </div>
            <div className="phone_home">
                 <div className="column-container2">
                    <img src={iphone} style={{maxWidth: "60vw"}}/>
                    <FadeDiv text={p4} className="bodyText"/>
                </div>
            </div>
            <div className="laptop_home">
                 <div className="column-container2">
                    <img src={laptop} style={{maxWidth: "60vw"}}/>
                    <FadeDiv text={p5} className="bodyText"/>
                </div>
            </div>
            <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
                <Gallery />
                <p className="bodyText" style={{
                        position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)",
                        zIndex: 2, textAlign: "center", textShadow: "2px 2px 1px rgba(0, 0, 0, 0.4)"}}>
                    {p6}
                </p>
            </div>
            <div className="fourth_home" style={{position: "relative", zIndex: 1}}>
                <img src={games} className="games-image"/>
                <p className="bodyText" style={{padding: "0 10vw 12vh 10vw"}}>{p7}</p>
            </div>
            <div className="fourth_home" style={{position: "relative", zIndex: 1}}>
                 <div className="column-container">
                    <FadeDiv text={p8} className="bodyText"/>
                    <img src={youtube} style={{height: "70vh", width: "auto"}}/>
                </div>
            </div>
            <div className="sixth_home" style={{position: "relative", zIndex: 1}}>
                <p className="bodyText" style={{padding: "10vw"}}>{p9}</p>
                <p className="bodyText" style={{padding: "0 10vw 3vh 10vw"}}>{p10}</p>
                <p className="bodyText" style={{padding: "0 10vw 3vh 10vw"}}>{p11}</p>
                <p className="bodyText" style={{padding: "0 10vw 3vh 10vw"}}>{p12}</p>
                <p className="bodyText" style={{padding: "0 10vw 3vh 10vw"}}>{p13}</p>
            </div>
        </>
    );
}

export default Radium(Home);