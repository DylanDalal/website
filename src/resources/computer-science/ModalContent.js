import React, { useState, useEffect } from 'react';
import '../Modal.css';
import '../../pages/Tech.css';
import beforeafter from './beforeafter.png';
import cplusplus from './c++.png';
import disguise from './disguise.png';
import mosys from './mosys.png';
import python_b from './python_b.png';
import python_w from './python_w.png';
import quest from './quest.png';
import tensorflow from './tensorflow.png';
import stype from './stype.png';
import sql from './sql.png';
import mariadb from './mariadb.png';
import opencv from './opencv.png';
import maya from './maya.png';
import r_logo from './R.png';
import csharp from './csharp.png';
import blender from './blender.png';
import plus from './plus.png';
import ue from './unreal_engine.png';
import houdini from './houdini.png';
import frames from './moon_knight_frames.png';
import ca1 from './im_conceptart1.jpg';
import ca2 from './im_conceptart2.jpg';
import degrain from './degrain.jpg';

const anima1 = `I spent my first full-time position as a Machine Learning
                Pipeline TD at Premise Entertainment LLC, where I served
                the immediate needs of our film’s animators. I was involved
                in designing our pipeline from the ground up and handled
                build and publish processes for the animation, layout, and
                crowds departments. I found the best ways to prepare scenes
                for rendering in Unreal Engine. I was also the sole ML
                specialist on the team, and I trained and implemented a s
                cheduler for our publishing system. My most valuable
                insights came from learning to solve a problem with
                workflow over development.`;

const anima2 = `I stopped working at Premise after my contract ended, and the
                company was removed from the project due to creative differences
                with investors.`;

const anima3 = `During my time at the Florida State University College of
                Motion Picture Arts, it was common for students to previsualize
                important projects using Unreal Engine before filming them. I
                assembled a team to develop plugins and help students learn more
                easily, with tools such as onion-skinning references to the viewport
                and automatic UAsset organization.`;

const anima4 = `My production company, Maximus, is combining a multitude of AI/ML
                technologies to automatically build scenes in Unreal Engine. The
                company’s first project is creating realistic LEGO animations, selected
                due to the mathematical properties of the interlocking brick system.`;

const aniurl = `https://www.cartoonbrew.com/feature-film/premise-entertainment-concept-development-artwork-jesus-235716.html`;

const datat1 = `The College of Motion Picture Arts’ Virtual Production program used
                a multitude of different software packages to enable communication
                between Unreal Engine and RED cameras. I learned
                about facilitating data transfer while investigating the product suites
                from mo-sys, RedSpy, and Disguise, and eventually facilitated building
                the official CMPA Virtual Production stage.`

const datat2 = `I was the lead developer on Monsters / Aliens / Robots / Zombies VFX’s
                migration from Ubuntu to CentOS. This process made me particularly knowledgeable
                about the differences between operating systems and how to navigate them.`

const datat3 = `I created proprietary scene build processes for the animation and layout teams
                at Premise Entertainment. These processes saved artists an immense amount of time
                by automatically referencing assets, placing cameras, and swapping rig types. I
                was eventually able to create a machine learning algorithm for our scheduler that
                built these scenes for the artists before they started working.`

const datat4 = `After losing access to our original pipeline, Premise Entertainment needed to
                quickly restore access to custom tools for all of its artists. I collaborated
                with IT to build a system that allowed the Pipeline team to re-add features to
                Maya as we rewrote them and had it up and running the same day that we lost access.`

const datat5 = `I’ve developmed an automatic edit reference ingest, which is a version of the
                film or sequence provided by the editorial team that reflects the current state of
                the cut, including timing, shot order, transitions, for both Monsters / Aliens /
                Robots / Zombies VFX and Prmeise Entertainment.`

const contr1 = `At Monsters / Aliens / Robots / Zombies VFX, I built SQL and noSQL databases to
                store frames from different stages of the VFX process. I used OpenCV to output these
                frames into before-and-after comparison videos for quick visual effects demonstrations
                to stakeholders.`

const contr2 = `These databases were also used as an intermediate step in the review process before
                the frames were published to ShotGrid.`

const contr3 = `When Premise Entertainment shifted to ftrack from ShotGrid, one of our top priorities was
                to re-enable the artists’ ability to publish assets for review. I tailored ftrack’s existing
                Maya and Houdini publishers to fit the company’s needs, which included building a reviewable
                withevery publish. I worked with the Editorial, Layout, Animation, and Crowds departments in
                order to create overlays on this reviewable.`

const visfx1 = `The Degrain project is a machine learning-powered visual effects process that we used on every frame
                ingested at Monsters / Aliens / Robots / Zombies. Every image has some amount of grain in it, and we
                would re-add that to ship back to clients, but grain can impact the performance of other machine
                learning models such as VanityAI. I worked first on training the algorithm and then on implementing it
                into the pipeline for the company’s internal frame storage databases.`

const visfx2 = `It was my introduction to training an artificial intelligence model to be used on a large scale. I
                learned about the importance of implementing pipeline changes instead of technical updates. `

export const DataTransferComponent = () => {
  const [aspectRatio, setAspectRatio] = useState(window.innerHeight / window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      // Update the aspect ratio on window resize
      setAspectRatio(window.innerHeight / window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className="tech-logos">
        <div>
          <img className="tech-logo" src={python_b} alt="Python" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={ue} alt="Unreal Engine" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={disguise} alt="Disguise" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={mosys} alt="Mo-Sys" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={stype} alt="Stype" style={{ margin: '0 5px 0 5px' }} />
        </div>
      </div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        FACILITATING VIRTUAL PRODUCTION
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      </div>
      <div>
        <p className="body_no_padding">{datat1}</p>
      </div>
      <div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        MIGRATING FROM UBUNTU TO CENTOS
      </div>
      <p className="body_no_padding">{datat2}</p>
      <div className="tech-logos">
        <div>
          <img className="tech-logo" src={python_b} alt="Python" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={maya} alt="Maya" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={houdini} alt="Houdini" style={{ margin: '0 5px 0 5px' }} />
        </div>
      </div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        SCENE BUILD PROCESSES
      </div>
        <p className="body_no_padding">{datat3}</p>
      </div>
      <div className="tech-logos">
        <div>
          <img className="tech-logo" src={python_b} alt="Python" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={maya} alt="Maya" style={{ margin: '0 5px 0 5px' }} />
        </div>
      </div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        STANDARDIZING CONFIGURATION FILES
      </div>
        <p className="body_no_padding">{datat4}</p>
      <div className="tech-logos">
        <div>
          <img className="tech-logo" src={python_b} alt="Python" style={{ margin: '0 5px 0 5px' }} />
        </div>
      </div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        INGESTING THE EDIT REFERENCE
      </div>
        <p className="body_no_padding">{datat5}</p>
      </div>
  );
};

export const AnimationComponent = () => {
  const [aspectRatio, setAspectRatio] = useState(window.innerHeight / window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      // Update the aspect ratio on window resize
      setAspectRatio(window.innerHeight / window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className="tech-logos">
        <div>
          <img className="tech-logo" src={python_b} alt="Python" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={maya} alt="Maya" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={ue} alt="Unreal Engine" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={houdini} alt="Houdini" style={{ margin: '0 5px 0 5px' }} />
        </div>
      </div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        FEATURE FILM ASSEMBLY IN UNREAL ENGINE
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <img
          src={ca2}
          alt="concept art"
          style={{
            width: '35vw',
            height: 'auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1,
            transform: 'translate(-5%, 0)',
            float: 'left',
            display: 'flex',
            margin: 0,
          }}
        />
        <p className="body_no_padding" style={{ color: '#d1d0d0', fontSize: '1vw', margin: '10px 0 10px 30px' }}>
          concept art provided to <a href={aniurl}>Cartoon Brew</a>
        </p>
        <img
          src={ca1}
          alt="concept art"
          style={{
            width: '28vw',
            height: 'auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            alignSelf: 'end',
            display: 'flex',
            margin: aspectRatio <= 1 ? '-25vh 0 0 0' : '-15vh 0 0 0', // Conditional margin based on window aspect ratio
            zIndex: 2,
          }}
        />
      </div>
      <div>
        <p className="body_no_padding" style={{paddingBottom: "0"}}>{anima1}</p>
        <p className="body_no_padding">{anima2}</p>
      </div>
      <div>
      <div className="tech-logos">
        <div>
          <img className="tech-logo" src={python_b} alt="Python" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={ue} alt="Unreal Engine" style={{ margin: '0 5px 0 5px' }} />
        </div>
      </div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        A MODERN APPROACH TO THE PREVIS PROCESS
      </div>
        <p className="body_no_padding">{anima3}</p>
        <div className="tech-logos">
        <div>
          <img className="tech-logo" src={python_b} alt="Python" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={ue} alt="Unreal Engine" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={blender} alt="Blender" style={{ margin: '0 5px 0 5px' }} />
        </div>
      </div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        A.I. SCENE ASSEMBLY FOR UNREAL ENGINE
      </div>
        <p className="body_no_padding">{anima4}</p>
      </div>
    </div>
  );
};

export const VisualEffectsComponent = () => {
  const [aspectRatio, setAspectRatio] = useState(window.innerHeight / window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      // Update the aspect ratio on window resize
      setAspectRatio(window.innerHeight / window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className="tech-logos">
        <div>
          <img className="tech-logo" src={python_b} alt="Python" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={ue} alt="Unreal Engine" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={disguise} alt="Disguise" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={mosys} alt="Mo-Sys" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={stype} alt="Stype" style={{ margin: '0 5px 0 5px' }} />
        </div>
      </div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        Machine Learning Degrain Project
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <img src={degrain}/>
      </div>
      <div>
        <p className="body_no_padding">{visfx1}</p>
        <p className="body_no_padding">{visfx2}</p>
      </div>
      <div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        MIGRATING FROM UBUNTU TO CENTOS
      </div>
      <p className="body_no_padding">{datat2}</p>
      <div className="tech-logos">
        <div>
          <img className="tech-logo" src={python_b} alt="Python" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={maya} alt="Maya" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={houdini} alt="Houdini" style={{ margin: '0 5px 0 5px' }} />
        </div>
      </div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        SCENE BUILD PROCESSES
      </div>
        <p className="body_no_padding">{datat3}</p>
      </div>
      <div className="tech-logos">
        <div>
          <img className="tech-logo" src={python_b} alt="Python" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={maya} alt="Maya" style={{ margin: '0 5px 0 5px' }} />
        </div>
      </div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        STANDARDIZING CONFIGURATION FILES
      </div>
        <p className="body_no_padding">{datat4}</p>
      <div className="tech-logos">
        <div>
          <img className="tech-logo" src={python_b} alt="Python" style={{ margin: '0 5px 0 5px' }} />
        </div>
      </div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        INGESTING THE EDIT REFERENCE
      </div>
        <p className="body_no_padding">{datat5}</p>
      </div>
  );
};


export const AssetOptimizationComponent = () => (
  <div>
    <h3>Asset Optimization</h3>
    <p>Sorry- I'm working on this page right now!</p>
    <p>I built a custom Blender-to-Unreal Engine pipelines to optimize assets for their use in the Virtual Reality
    game I built for the Florida State University College of Motion Picture Arts. This dramatically reduced polygons
    in the assets which were acquired through photogrammetry.</p>
  </div>
);

export const ContentReviewComponent = () => {
  const [aspectRatio, setAspectRatio] = useState(window.innerHeight / window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      // Update the aspect ratio on window resize
      setAspectRatio(window.innerHeight / window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className="tech-logos">
        <div>
          <img className="tech-logo" src={python_b} alt="Python" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={mariadb} alt="MariaDB" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={sql} alt="SQL" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={opencv} alt="OpenCV" style={{ margin: '0 5px 0 5px' }} />
        </div>
      </div>
      <div className="modal-subheader" style={{}}>
        SQL AND noSQL DATABASES FOR SHOT REVIEW
      </div>
        <div className="content-review-frames">
            <img src={frames} alt="concept art" style={{width: "58vw",
                                                        zIndex: 1,
                                                        display: 'flex',
                                                        position: "absolute",
                                                        transform: "translate(0, 3vw)"}}/>
            <div style={{
              position: 'absolute',
              width: "120%",
              top: 0, left: 0, right: 0, bottom: 50,
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0), #efefef)',
              zIndex: 2,
              transform: "translate(0, 3vw)"
            }} />
            <img src={beforeafter} alt="before and after" style={{zIndex: 2,
                                                                  width: "44vw",
                                                                  transform: "translate(0, 3vw)"}}/>
        </div>
      <div style={{margin: "8vw 0 0 0"}}>
        <p className="body_no_padding" style={{paddingBottom: "0"}}>{contr1}</p>
        <p className="body_no_padding">{contr2}</p>
      </div>
      <div>
      <div className="tech-logos">
        <div>
          <img className="tech-logo" src={python_b} alt="Python" style={{ margin: '0 5px 0 5px' }} />
          <img className="tech-logo" src={ue} alt="Unreal Engine" style={{ margin: '0 5px 0 5px' }} />
        </div>
      </div>
      <div className="modal-subheader" style={{ paddingBottom: '1vh' }}>
        fTRACK SCENE PUBLISHER PLUGINS
      </div>
        <p className="body_no_padding">{contr3}</p>
      </div>
    </div>
  );
};
