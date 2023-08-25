import React, {useState} from 'react';
import Radium from 'radium';
import '../App.css';
import './Home.css';
import FadeDiv from '../components/FadeDiv';
import westchester from '../resources/story/westchester.png';
import florida from '../resources/story/florida.png';

const first_paragraph = `I was born in West Chester, a Philadelphia suburb, in March
    of 2001. It never snowed while I lived there. But this is what it looked like in my mind.`

const second_paragraph = `We moved to South Florida not long after, to the house that my mom, dad,
and brother have lived in ever since.`


function Home() {


    return (
        <>
            <div className="first_home" style={{position: "relative", zIndex: 1, justifyContent: "center",
                        alignItems: "center"}}>
                <div className="columns-container">
                    <FadeDiv text={first_paragraph} className="bodyText"/>
                    <img src={westchester} className="image-style"/>
                </div>
            </div>
            <div className="second_home" style={{position: "relative", zIndex: 1}}>
                <div className="columns-container">
                    <FadeDiv text={second_paragraph} className="bodyText"/>
                    <img src={florida} className="image-style"/>
                </div>
            </div>
            <div className="third_home" style={{position: "relative", zIndex: 1}}>
            </div>
        </>
    );
}

export default Radium(Home);