import React, {useState, useEffect} from 'react';
import Radium from 'radium';
import '../App.css';
import './Film.css';
import './Home.css';
import FadeDiv from '../components/FadeDiv';
import FadeVideo from '../components/FadeVideo';
import botm from '../resources/film/botm.jpg';
import botmgif from '../resources/film/botm.gif';
import md from '../resources/film/MonotonousDejection.jpg';
import mdgif from '../resources/film/md.gif';
import river from '../resources/film/the_river.jpg';
import rivergif from '../resources/film/river.gif';
import control from '../resources/film/control.jpg';
import controlgif from '../resources/film/control.gif';
import lastride from '../resources/film/LastRideTN.jpg';
import lastridegif from '../resources/film/lastride.gif';
import fmf from '../resources/film/fmf.jpg';
import fmfgif from '../resources/film/fmf.gif';

const VideoDesc = ({ video, onClose }) => {
    return (
            <div className="desc-content">
                <div style={{fontFamily: "DINCondensed",
                             fontSize: "3vw",
                             textTransform: "uppercase",
                             paddingTop: "5%",
                             }}> {video.title} </div>
                <div style={{ width: '100%', color: "white", borderBottom: '1px solid #000' }}></div>
                <div style={{fontFamily: "DINCondensed",
                             fontSize: "1.5vw",
                             paddingTop: "0",
                             textTransform: "uppercase",
                             }}> {video.role} </div>
                <div style={{fontFamily: "Futura",
                             fontSize: "1vw",
                             paddingLeft: "3vw",
                             paddingRight: "3vw"
                             }}> {video.description} </div>
            </div>
    );
};

const VideoModal = ({ video, onClose }) => {
  return (
      <div className="modal-content">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title={video.title}
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
  );
};

const vp_reel = [
    {
        videoId: 'P80XtLAZBOY',
    }
]

const cine_reel = [
    {
        videoId: 'P80XtLAZBOY',
    }
]

const director_desc = `My Directing credits have come from directing five short films, all using a Virtual
Production stage but with varying numbers of crew members, as well as one independent animated feature.`;

const vp_reel_desc = `In addition to my time building their Virtual Production system, writing course material for it,
and training faculty to use it, I was able to help create nine short films during my time as a Virtual Production
Researcher for Florida State University. `;

const videos = [
  {
    videoId: 'dCT-SM94qFo',
    title: 'Boss of the Month',
    role: "Director | Writer | Editor | StageCraft Technician",
    description: `Boss of the Month is a comedic short film about a bakery employee that has to deal with a strange-
    yet familiar- customer. It was shot on a Virtual Production volume, and though it has some glaring audio issues,
    it's my personal favorite short film I've made.`,
    thumbnailUrl: botm,
    thumbnailUrlGif: botmgif,
  },
  {
    videoId: 'x6IZ6bCGbMg',
    title: 'Monotonous Dejection',
    role: "Director | Writer | Editor | StageCraft Technician",
    description: `Monotonous Dejection is a dramatic short film about a quotidian Uber ride's progression into a
    midnight therapy session. A script that I'd developed years ago, we cut it down to a more suitable length and shot
    it as a screen test for our Jeep prop.`,
    thumbnailUrl: md,
    thumbnailUrlGif: mdgif,
  },
  {
    videoId: 'klEVBSD7k84',
    title: 'The River',
    role: "Director | Writer | Editor | StageCraft Technician",
    description: `The River is a comedic Western short film about the last play in a Poker standoff. It was my first
    short film and the first narrative test of FSU's StageCraft Virtual Production volume.`,
    thumbnailUrl: river,
    thumbnailUrlGif: rivergif,
  },
  {
    videoId: '1OaWBCMEDjE',
    title: 'Last Ride',
    role: "Editor | StageCraft Technician",
    description: `Last Ride is a comedic skit about an Uber driver's unfortunate ending. It is actually a number of test
    shots that I made into a narrative in the editing room- we didn't bother recording audio for our tests, so, I had
    to get creative.`,
    thumbnailUrl: lastride,
    thumbnailUrlGif: lastridegif,
  },
  {
    videoId: '9iRiZMCntXY',
    title: 'Control',
    role: "StageCraft Technician",
    description: `Control is an FSU student's thesis film, a music video about a universe-jumping assassin's
    confrontation with her latest target. I was the lead technician for the Virtual Production volume that the
    live-action portions of the film were shot using.`,
    thumbnailUrl: control,
    thumbnailUrlGif: controlgif,
  },
  {
    videoId: 'QFIvwBPdVFc',
    title: 'Find My Friends',
    role: "Editor | StageCraft Technician",
    description: `Find My Friends is a comedic horror-inspired short film about a pair of campers' visit to a new
    campsite. I acted as the editor and lead StageCraft Technician on the project, which was shot on a Virtual
    Production volume.`,
    thumbnailUrl: fmf,
    thumbnailUrlGif: fmfgif,
  },
  {
    videoId: 'temp',
    title: "No McDonald's on the Moon",
    role: "Cinematographer | Editor | StageCraft Technician",
    description: `No McDonald's on the Moon was made as a test and display of the wide range of colors the FSU Virtual
    Production system could showcase. I added a few more shots to the beginning and end of the test to make it into a
    short film.`
    thumbnailUrl: temp2,
    thumbnailUrlGif: temp3,
  },
  {
    videoId: 'temp',
    title: "Ebenezer Has Something To Show You",
    role: "Writer | Editor | StageCraft Technician"
  }
];


function Film() {
    const [randomN, setRandom] = useState(.8);
    const randomizer = () => setRandom(Math.random());

    const [defaultVideo, setDefaultVideo] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [hoveredVideo, setHoveredVideo] = useState(null);

    const hoverVideo = (video) => {
        setHoveredVideo(video);
    };

    const unhoverVideo = () => {
        setHoveredVideo(null);
    };

    const openModal = (video) => {
        setSelectedVideo(video);
        setDefaultVideo(video);
    };

    const closeModal = () => {
        setSelectedVideo(null);
        setDefaultVideo(null);
    };

    const [randomNumbers, setRandomNumbers] = useState([]);

    useEffect(() => {
        const newRandomNumbers = Array.from({ length: 20 }, () => Math.floor((Math.random() * 2 - 1) * 2.5));
        setRandomNumbers(newRandomNumbers);
    }, []);

    /* Thumbnail to gif */
    const preloadedGifs = videos.map((video) => {
      const image = new Image();
      image.src = video.thumbnailUrlGif;
      return image;
    });

    const [thumbnailStates, setThumbnailStates] = useState(videos.map(() => 'jpeg')); // Initialize all thumbnails as JPEG
    const [gifsPreloaded, setGifsPreloaded] = useState(false);

    const toggleThumbnailState = (index) => {
      const newThumbnailStates = [...thumbnailStates];
      newThumbnailStates[index] = thumbnailStates[index] === 'jpeg' ? 'gif' : 'jpeg';
      setThumbnailStates(newThumbnailStates);
    };

    useEffect(() => {
      // Preload the GIFs
      Promise.all(preloadedGifs.map((image) => image.decode())).then(() => {
        setGifsPreloaded(true);
      });

      // Your existing interval code for switching thumbnails
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * videos.length);
        toggleThumbnailState(randomIndex);
      }, 5000);

      return () => clearInterval(interval);
    }, []);

const VideoThumbnail = ({ video, onClick }) => {
  const index = videos.findIndex((v) => v.videoId === video.videoId);
  const currentThumbnailState = thumbnailStates[index];

  // Only display the GIF if it's preloaded, otherwise display the JPEG
  const imageUrl =
    currentThumbnailState === 'gif' && gifsPreloaded
      ? video.thumbnailUrlGif
      : video.thumbnailUrl;

  return (
    <div className="thumbnail" onClick={() => onClick(video)}>
      <img src={imageUrl} alt={video.title} className="thumbnail-image" />
    </div>
  );
};

    return (
        <>
            <div className="first_film" style={{position: "relative", zIndex: 1}}>
                <FadeDiv text="Reels" className="header2"/>
                <div className="column-container">
                    <div>
                        <FadeDiv text="Director" className="header3"/>
                        <div style={{width: "33vw"}}>
                            <FadeDiv text={director_desc} className="textStyle" />
                        </div>
                    </div>
                    <VideoModal video={vp_reel} onClose={closeModal}/>
                </div>
                <div className="column-container">
                    <div>
                        <FadeDiv text="Virtual Production Director" className="header3"/>
                        <div style={{width: "33vw"}}>
                            <FadeDiv text={vp_reel_desc} className="textStyle" />
                        </div>
                    </div>
                    <VideoModal video={cine_reel} onClose={closeModal}/>
                </div>
            </div>
            <div className="second_film" style={{position: "relative", zIndex: 1}}>
                <FadeDiv text="Editing Portfolio" className="header2"/>
            </div>
            <div className="third_film" style={{position: "relative", zIndex: 1}}>
                <div className="header2">Complete Portfolio</div>
                <div className="column-container" style={{gap: "5vw"}}>
                    <div className="slate_background">
                        <div className="slate_background2">
                            {(hoveredVideo || defaultVideo) && <VideoDesc video={hoveredVideo || defaultVideo} onClose={unhoverVideo} />}
                        </div>
                    </div>
                    <div className="slate_background">
                        <div className="slate_background2">
                            {selectedVideo && <VideoModal video={selectedVideo} onClose={closeModal} />}
                        </div>
                    </div>
                </div>
                <div className="video-grid">
                    {videos.map((video, index) => (
                        <div
                            key={video.videoId}
                            style={{ transform: `rotate(${randomNumbers[index]}deg)` }}
                            onMouseEnter={() => hoverVideo(video)}
                            onMouseLeave={unhoverVideo}
                        >
                            <VideoThumbnail video={video} onClick={openModal}  />
                        </div>
                    ))}
                </div>
            </div>
        </>
        );
    };

export default Radium(Film);