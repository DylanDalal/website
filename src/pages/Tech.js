import React, {useState, useEffect} from 'react';
import Radium from 'radium';
import '../App.css';
import './Film.css';
import './Tech.css'
import FadeDiv from '../components/FadeDiv';
import './Home.css';

const reims = `I was initially brought on to the College of Motion Picture Arts to lead the software development of an
               VR tour of France’s Notre Dame de Reims Cathedral. We partnered with the University of Alabama to take a
               Matterport 3D scan of the cathedral, which my teammate then cleaned up in Blender while I wrote the
               tour's gameplay features. \n\n The project generated tens of thousands of dollars for the FSU CMPA in
               grant funding for preserving history through technology.`;

function Film() {
    return (
        <>
            <div className="first_tech" style={{position: "relative", zIndex: 1}}>
                <FadeDiv text={"Virtual Production Volume"} className="header2"/>
                <div className="column-container" style={{gap: "5vw"}}>
                </div>
            </div>
            <div className="second_tech" style={{position: "relative", zIndex: 1}}>
                <FadeDiv text={"Data Analysis Paper"} className="header2"/>
                <div className="column-container" style={{gap: "5vw"}}>
                </div>
            </div>
            <div className="third_tech" style={{position: "relative", zIndex: 1}}>
                <FadeDiv text={"VanityAI"} className="header2"/>
                <div className="column-container" style={{gap: "5vw"}}>
                </div>
            </div>
            <div className="fourth_tech" style={{position: "relative", zIndex: 1}}>
                <FadeDiv text="Notre Dame de Reims for Oculus Quest" className="header2"/>
                <div className="column-container">
                    <div>
                        <FadeDiv text="Experience Gothic, Anywhere" className="header4"/>
                        <FadeDiv text={reims} className="textStyle"/>
                    </div>
                </div>
            </div>
            <div className="fifth_tech" style={{position: "relative", zIndex: 1}}>
                <FadeDiv text="Premise Entertainment" className="header2"/>
                <div className="column-container">
                    <div>
                        <FadeDiv text="Software Engineer Intern" className="header4"/>
                        <FadeDiv text="Cinematography" className="textStyle"/>
                    </div>
                </div>
            </div>
        </>
        );
    };

export default Radium(Film);