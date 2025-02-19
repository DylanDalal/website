import React, { useState, useEffect, useRef } from 'react';
import Radium from 'radium';
import { Helmet } from "react-helmet";
import '../App.css';
import './Film.css';
import './Tech.css';
import FadeDiv from '../components/FadeDiv';
import './Home.css';
import animation from '../resources/computer-science/animation.png';
import asset from '../resources/computer-science/asset.png';
import content from '../resources/computer-science/content.png';
import data from '../resources/computer-science/data_transfer.png';
import vfx from '../resources/computer-science/vfx.png';
import VisitWebsiteButton from '../resources/VisitWebsiteButton';
import Modal from '../resources/Modal';
import p_aby from '../resources/computer-science/p_aby.png';
import p_spi from '../resources/computer-science/p_spi.png';
import p_twd from '../resources/computer-science/p_twd.jpg';
import p_zoe from '../resources/computer-science/p_zoe.jpg';
import p_str from '../resources/computer-science/p_str.jpg';
import p_pcj from '../resources/computer-science/p_pcj.jpg';
import p_btr from '../resources/computer-science/p_btr.png';
import p_fam from '../resources/computer-science/p_fam.png';
import p_see from '../resources/computer-science/p_see.png';
import p_wed from '../resources/computer-science/p_wed.png';
import ue from '../resources/computer-science/unreal_engine.png';
import vp from '../resources/computer-science/virtual_production.png';
import vr from '../resources/computer-science/virtual_reality.png';
import cplusplus from '../resources/computer-science/c++.png';
import disguise from '../resources/computer-science/disguise.png';
import mosys from '../resources/computer-science/mosys.png';
import python_b from '../resources/computer-science/python_b.png';
import python_w from '../resources/computer-science/python_w.png';
import quest from '../resources/computer-science/quest.png';
import tensorflow from '../resources/computer-science/tensorflow.png';
import stype from '../resources/computer-science/stype.png';
import sql from '../resources/computer-science/sql.png';
import mariadb from '../resources/computer-science/mariadb.png';
import opencv from '../resources/computer-science/opencv.png';
import maya from '../resources/computer-science/maya.png';
import r_logo from '../resources/computer-science/R.png';
import csharp from '../resources/computer-science/csharp.png';
import plus from '../resources/computer-science/plus.png';
import {
  DataTransferComponent,
  AnimationComponent,
  VisualEffectsComponent,
  AssetOptimizationComponent,
  ContentReviewComponent
} from '../resources/computer-science/ModalContent';

const vana1 = `At MARZ VFX, I contributed to the development of Vanity AI, a production-ready solution designed to
               handle high volumes of advanced 2D visual effects. The tool specializes in cosmetic enhancements,
               delivering results up to 300x faster than traditional production methods.`;

const vana2 = `As a Machine Learning Pipeline Intern, I learned the fundamentals of building and distributing AI
               technology, and how to fit that new technology into an existing company pipeline.`;

const reims = `Before we started the Virtual Production volume, I lead the software development of a VR tour of France’s
               Notre Dame de Reims Cathedral. FSU partnered with the University of Alabama, who took a 3D scan of the
               cathedral using Matterport, which we had to clean and optimize before implementing gameplay features.`;
const reim2 = `The tour generated tens of thousands of dollars in funding for the College of Motion Picture Arts
               for preserving history through technology. It was my introduction to the Software Development Life Cycle
               and my first major project.`;

const virt1 = `In January 2021, the Florida State University College of Motion Picture Arts launched the Torchlight
               Center, the campus's hub for teaching film technology. I was their first hire and eventually ascended to
               the role of Senior Virtual Production Researcher with the responsibility of assembling the first Virtual
               Production volume ever purchased by a public university.`

const virt2 = `I researched technologies from many companies and experimented with a multitude before we settled on a
               Disguise-powered system with RedSpy Stype tracking. On top of wiring and routing data through the
               volume, I personally contributed to documentation that's been used for class material and trained faculty
               and staff on how to use the equipment.`

const virt3 = `It was my introduction to leading a team in a professional setting; to being a part of the planning,
               testing, and execution of a major project; and to the intricacies of working in a large organization.`;

const psych1 = `My research at the FSU Department of Psychology centered around removing participant biases from our
               experiment results by doing in-depth data analysis on respondent datasets. The goal was to determine
               if and how people use the properties of math when completing math problems.`

const psych2 = `I never finished the project, which I immensely regret. It was my first long-form software engineering
                project consisting entirely of writing code. Each property was written with a different method, ranging
                from Binary Expression Tree navigation to simple string processing. It taught me to research the correct
                tools for the job and how to write a half-decent algorithm.`

const svm1 = `My Machine Learning course at school tasked us with creating a support vector machine from scratch that
              would draw the most precise line separating two overlapping datasets.`

const svm2 = `By far the most challenging project I worked on during college, I learned a great deal about supervised
              machine learning algorithms.`

const webapp1 = `The resulty of the entirety of my Introduction to C# course, the TaskManager Application provides a
                full User Interface written in Xamarin.Forms for local user interaction with a WebAPI.`

const webapp2 = `The WebAPI is written using the .NET framework and locally saves inputted tasks to a JSON file for
                 persistent usage of the API.`

const space = `\n`;

const piped = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis  elementum dapibus. Morbi
               accumsan iaculis metus. Nulla nec erat magna.`;

const asoj_intro = [
  {
    videoId: 'kfyY9aGAVLE',
  }
];

function Tech() {
  const [selectedContent, setSelectedContent] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [modalHeader, setModalHeader] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useState(null);

  const openModal = (type) => {
    setIsModalOpen(true);
    switch (type) {
      case 'Data Transfer':
        setModalHeader('Data Transfer');
        setModalContent(<DataTransferComponent />); // Importing component from ModalContent.js
        break;
      case 'Animation':
        setModalHeader('Animation');
        setModalContent(<AnimationComponent />); // Importing component from ModalContent.js
        break;
      case 'Visual Effects':
        setModalHeader('Visual Effects');
        setModalContent(<VisualEffectsComponent />); // Importing component from ModalContent.js
        break;
      case 'Game Development':
        setModalHeader('Game Development');
        setModalContent(<AssetOptimizationComponent />); // Importing component from ModalContent.js
        break;
      case 'Content Review':
        setModalHeader('Content Review');
        setModalContent(<ContentReviewComponent />); // Importing component from ModalContent.js
        break;
      default:
        setModalContent(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null); // Clear modal content on close
  };

  useEffect(() => {
    if (carouselRef.current) {
      startAutoscroll(carouselRef.current, 160, 2000);
    }
  }, []);
  // Build a listener to close pipeline development modal with Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    }; if (selectedContent) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedContent]);

    return (
    <>
    <Helmet>
        <title>Dylan Dalal | Technical Portfolio</title>
        <meta name="description" content="Explore Dylan Dalal's software engineering and tech projects in AI, pipeline development, and virtual production." />

        {/* Schema Markup */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dylan Dalal",
            "url": "https://dylandalal.com",
            "image": "https://dylandalal.com/profile.jpg",
            "jobTitle": "Software Engineer & Pipeline Developer",
            "sameAs": [
              "https://linkedin.com/in/dylandalal",
              "https://github.com/dylandalal",
              "https://twitter.com/dylandalal"
            ]
          }
          `}
        </script>
      </Helmet>

      <div className="first_tech" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ alignItems: 'left' }}>
          <div className="tech-logos" style={{ display: 'flex', alignItems: 'center', margin: '0 3vw 0 3vw', paddingBottom: "0" }}>
            <div>
              <img className="tech-logo" src={python_w} alt="Dylan Dalal Python" style={{ margin: "0 5px 0 5px" }}/>
            </div>
          </div>
          <div className="header_pipeline" style={{ color: 'white', margin: '0 3vw 0 3vw', alignItems: 'left' }}>
            Pipeline Development
          </div>
          <div className="body_no_padding" style={{ color: 'white', margin: '0 3vw 0 3vw' }}>
            Many of my projects have focused on optimizing workflows, and I have been specifically employed as a
            Pipeline Developer at three companies. Choose a specialization for more details.
          </div>
        </div>
        {/* Carousel */}
        <div className="carousel-container" style={{ paddingBottom: "5vh", margin: "0 0 0 0" }}>
          <ul className="carousel">
            <li className="carousel-item" onClick={() => openModal('Data Transfer')}>
              <img className="carousel-plus" src={plus} alt="Dylan Dalal" />
              <img src={data} alt="Dylan Dalal Data Transfer" />
              <div className="carousel-text">data transfer</div>
            </li>
            <li className="carousel-item" onClick={() => openModal('Animation')}>
              <img className="carousel-plus" src={plus} alt="Dylan Dalal" />
              <img src={animation} alt="Dylan Dalal Animation" />
              <div className="carousel-text">animation</div>
            </li>
            <li className="carousel-item" onClick={() => openModal('Visual Effects')}>
              <img className="carousel-plus" src={plus} alt="Dylan Dalal" />
              <img src={vfx} alt="Dylan Dalal Visual Effects" />
              <div className="carousel-text">visual effects</div>
            </li>
            <li className="carousel-item" onClick={() => openModal('Game Development')}>
              <img className="carousel-plus" src={plus} alt="Dylan Dalal" />
              <img src={asset} alt="Dylan Dalal Game Development" />
              <div className="carousel-text">game development</div>
            </li>
            <li className="carousel-item" onClick={() => openModal('Content Review')}>
              <img className="carousel-plus" src={plus} alt="Dylan Dalal" />
              <img src={content} alt="Dylan Dalal Content Review" />
              <div className="carousel-text">content review</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="second_tech" style={{ position: 'relative', zIndex: 1 }}>
        <div className="tech-logos" style={{ display: 'flex', alignItems: 'center', paddingBottom: "0" }}>
          <div>
            <img className="tech-logo" src={python_b} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }}/>
            <img className="tech-logo" src={tensorflow} alt="Dylan Dalal" style={{ margin: "0 5px 7px 5px" }} />
            <img className="tech-logo" src={sql} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }} />
            <img className="tech-logo" src={mariadb} alt="Dylan Dalal" style={{ margin: "0 5px 2px 5px" }} />
            <img className="tech-logo" src={opencv} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }} />
          </div>
        </div>
        <div className="header_pipeline" style={{ color: 'black', alignItems: 'left', paddingBottom: '10px' }}>
          Saving $8 Million with VanityAI
        </div>
        <div style={{  alignItems: 'center'  }}>
            <div className="column-container2" style={{gap: "2vw"}}>
              <div style={{maxWidth: "75vw"}}>
                <div className="body_no_padding" style={{ color: 'black' }}>{vana1}</div>
                <div className="body_no_padding" style={{ color: 'black' }}>{vana2}</div>
                <div style={{ textAlign: 'center' }}>
                  <VisitWebsiteButton url="https://monstersaliensrobotszombies.com/vanityai" />
                </div>
              </div>
              <div style={{ margin: '0px', paddingBottom: '0px'}}>
                <div
                  id="autoscroll"
                  className="carousel-container"
                  style={{}}
                  ref={carouselRef}
                >
                  <ul className="carousel" style={{paddingBottom: '10px', margin: '0px', maxWidth: "80vw" }}>
                    <li className="carousel-item2">
                      <img src={p_str} alt="Dylan Dalal worked on Stranger Things Season 4" />
                    </li>
                    <li className="carousel-item2">
                      <img src={p_spi} alt="Dylan Dalal worked on Spider-Man: No Way Home" />
                    </li>
                    <li className="carousel-item2">
                      <img src={p_pcj} alt="Dylan Dalal worked on Percy Jackson and the Olympians" />
                    </li>
                    <li className="carousel-item2">
                      <img src={p_twd} alt="Dylan Dalal worked on The Walking Dead" />
                    </li>
                    <li className="carousel-item2">
                      <img src={p_aby} alt="Dylan Dalal worked on Anyone But You" />
                    </li>
                    <li className="carousel-item2">
                      <img src={p_see} alt="Dylan Dalal worked on See" />
                    </li>
                    <li className="carousel-item2">
                      <img src={p_zoe} alt="Dylan Dalal worked on Zoe's Extraordinary Playlist" />
                    </li>
                    <li className="carousel-item2">
                      <img src={p_fam} alt="Dylan Dalal worked on For All Mankind" />
                    </li>
                  </ul>
                </div>
                <div className="body_no_padding" style={{ color: '#9e9e9e', textAlign: 'center' }}>
                  used in 45+ major productions to date
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className="third_tech" style={{ position: 'relative', display: 'flex', alignItems: 'center', paddingTop: '6vh' }}>
        <div className="column-container" style={{ gap: '5vw', paddingBottom: '0', alignItems: 'center' }}>
            <div class="image-container">
              <img src={vp} alt="Dylan Dalal Virtual Production"/>
                <div className="vp-container">
                  <div className="vp-content">
                    <div className="vp-text">VIRTUAL</div>
                    <div className="vp-text small">PRODUCTION</div>
                  </div>
                </div>
            </div>
            <div style={{ maxWidth: "75vw"}}>
                <div className="tech-logos">
                  <div>
                    <img className="tech-logo" src={python_b} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }}/>
                    <img className="tech-logo" src={ue} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }} />
                    <img className="tech-logo" src={disguise} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }} />
                    <img className="tech-logo" src={mosys} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }} />
                    <img className="tech-logo" src={stype} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }} />
                  </div>
                </div>
                <div className="header2_pipeline" style={{ paddingBottom: '10px'}}>
                    THE FIRST ACADEMIC VP STAGE
                </div>
                <div style={{maxWidth: "75vw", alignItems: "center"}}>
                    <div className="body_no_padding" style={{ color: 'black' }}>{virt1}</div>
                    <div className="body_no_padding" style={{ color: 'black' }}>{virt2}</div>
                    <div className="body_no_padding" style={{ color: 'black' }}>{virt3}</div>
                </div>
            </div>
        </div>
      </div>
      <div className="third_tech" style={{ position: 'relative', display: "flex", alignItems: "center", paddingTop: "0" }}>
        <div className="column-container2" style={{ gap: '5vw' }}>
                <div style={{maxWidth: "80vw"}}>
                <div className="tech-logos" style={{ display: 'flex', alignItems: 'center', paddingBottom: "0"}}>
                  <div>
                    <img className="tech-logo" src={cplusplus} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }}/>
                    <img className="tech-logo" src={ue} alt="Dylan Dalal" style={{ margin: "0 5px 2px 5px" }} />
                  </div>
                </div>
                <div className="header2_pipeline" style={{ color: 'black', alignItems: 'left'}}>
                    PRESERVING HISTORY WITH VR
                </div>
                <div>
                    <div className="body_no_padding" style={{ color: 'black' }}>{reims}</div>
                    <div className="body_no_padding" style={{ color: 'black' }}>{reim2}</div>
                    <div style={{ textAlign: 'center' }}>
                        <VisitWebsiteButton url="https://www.jenniferfeltman.com/vrcathedral" />
                    </div>
                </div>
            </div>
            <div class="image-container">
              <img src={vr} alt="Dylan Dalal Virtual Reality"/>
                <div className="vr-container">
                  <div className="vr-content">
                    <div className="vr-text">VIRTUAL</div>
                    <div className="vr-text small">REALITY</div>
                  </div>
                </div>
            </div>
        </div>
      </div>
      <div className="fourth_tech" style={{ position: 'relative', zIndex: 1 }}>
        <div class="grid">
          <div class="grid-item">
            <div className="tech-logos" style={{ display: 'flex', padding: "20px 0 0 0"}}>
              <div>
                <img className="tech-logo" src={python_b} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }}/>
                <img className="tech-logo" src={r_logo} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }} />
              </div>
            </div>
            <h3>Mathematical Property Algorithms</h3>
            <p>{psych1}</p>
            <p>{psych2}</p>
            <div style={{ margin: "1vh 0 2vh 0" }}>
              <VisitWebsiteButton url="https://github.com/DylanDalal/my-work/tree/main/Python/Commutativity" />
            </div>
          </div>
          <div class="grid-item dark">
            <div className="tech-logos" style={{ display: 'flex', alignItems: 'center', padding: "20px 0px 0px 0px"}}>
              <div>
                <img className="tech-logo" src={python_w} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }}/>
              </div>
            </div>
            <h3>Support Vector Machine Classifier</h3>
            <p>{svm1}</p>
            <p>{svm2}</p>
            <div style={{ margin: "1vh 0 2vh 0" }}>
              <VisitWebsiteButton url="https://github.com/DylanDalal/my-work/tree/1ff8072fd3791ffd3b56d6aa14412e097cb729b8/Python/Support-Vector-Machine" />
            </div>
          </div>
          <div class="grid-item">
            <div className="tech-logos" style={{ display: 'flex', alignItems: 'center', padding: "20px 0px 0px 0px"}}>
              <div>
                <img className="tech-logo" src={csharp} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }}/>
                <img className="tech-logo" src={sql} alt="Dylan Dalal" style={{ margin: "0 5px 0 5px" }} />
              </div>
            </div>
            <h3>C# Webapp Implementation</h3>
            <p>{webapp1}</p>
            <p>{webapp2}</p>
            <div style={{ margin: "1vh 0 2vh 0" }}>
              <VisitWebsiteButton url="https://github.com/DylanDalal/my-work/tree/main/C%23/TaskManagerUI-WebAPI" />
            </div>
          </div>
          <div class="grid-item dark">
            <div className="tech-logos" style={{ display: 'flex', alignItems: 'center', padding: "20px 0px 0px 0px"}}>
              <div>
              </div>
            </div>
            <h3>Coming soon!</h3>
            <div style={{ margin: "1vh 0 2vh 0" }}>
            </div>
          </div>
          <div class="grid-item">
            <h3>Classwork</h3>
            <div style={{ margin: "1vh 0 2vh 0" }}>
              <VisitWebsiteButton url="https://github.com/DylanDalal/my-work" />
            </div>
          </div>
          <div class="grid-item dark">
            <h3>This Website</h3>
            <div style={{ margin: "1vh 0 2vh 0" }}>
              <VisitWebsiteButton url="https://github.com/DylanDalal/website" />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        headerText={modalHeader}
        bodyContent={modalContent}
        onClose={closeModal}
      />
    </>
  );
}

function startAutoscroll(carousel, scrollAmount = 160, interval = 2000) {
  setInterval(() => {
    if (carousel.scrollWidth - carousel.scrollLeft <= carousel.clientWidth) {
      // Reset to the beginning if the end is reached
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // Scroll by the specified amount
      carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  }, interval);
}

export default Radium(Tech);
