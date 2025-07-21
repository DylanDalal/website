import React, { useState, useEffect } from 'react';
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
import airtab from '../resources/film/airtab.jpg';
import airtabgif from '../resources/film/airtab.gif';
import ofai from '../resources/film/ofai.jpg';
import ofaigif from '../resources/film/ofai.gif';
import control from '../resources/film/control.jpg';
import controlgif from '../resources/film/control.gif';
import lastride from '../resources/film/LastRideTN.jpg';
import lastridegif from '../resources/film/lastride.gif';
import fmf from '../resources/film/fmf.jpg';
import fmfgif from '../resources/film/fmf.gif';

const VideoDesc = ({ video, onClose }) => {
  return (
    <div className="desc-content">
      <div className="desc-title">{video.title}</div>
      <div className="desc-divider"></div>
      <div className="desc-role">{video.role}</div>
      <div className="desc-description">{video.description}</div>
    </div>
  );
};

const VideoModal = ({ video, onClose }) => {
  return (
    <div className="video-modal-content">
      <iframe
        src={`https://www.youtube.com/embed/${video.videoId}`}
        title={video.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const vp_reel = [
  {
    videoId: 'Kq8MBfpi8CM',
    title: 'Virtual Production Reel',
    thumbnailUrl: 'https://img.youtube.com/vi/Kq8MBfpi8CM/maxresdefault.jpg',
  },
];

const cine_reel = [
  {
    videoId: 'Kq8MBfpi8CM',
  },
];

const vp_reel_desc = `While building the Virtual Production stage at Florida State University, I tested many systems
                      before selecting our final setup using Disguise and stYpe RedSpy. I created Python pipelines to
                      facilitate data transfer and facilitate set creation on the volume. I built custom pipelines for
                      optimizing assets and moving them into Unreal Engine. I also created training documentation and
                      taught both faculty and students how to use the tools in production.`;


const videos = [
  {
    videoId: 'dCT-SM94qFo',
    title: 'Boss of the Month',
    role: 'Director | Writer | Editor | VP Technician',
    description: `Boss of the Month is a comedic short film about a bakery employee that has to deal with a strange-
    yet familiar- customer. It was shot on a Virtual Production volume, and though it has some glaring audio issues,
    it's my personal favorite short film I've made.`,
    thumbnailUrl: botm,
    thumbnailUrlGif: botmgif,
  },
  {
    videoId: '1M31OfuZIqU',
    title: 'Open for an Icon Teaser',
    role: 'Editor | Motion Graphics',
    description: `The teaser displayed in the hero section of the Open For an Icon website, a subset of Airtab Media. I
    edited it using clips from various Airtab Media-organized concerts to show artists the opportunities OFAI affords
    them. I created the intro of this video in Blender.`,
    thumbnailUrl: ofai,
    thumbnailUrlGif: ofaigif,
  },
  {
    videoId: 'x6IZ6bCGbMg',
    title: 'Monotonous Dejection',
    role: 'Director | Writer | Editor | VP Technician',
    description: `Monotonous Dejection is a dramatic short film about a quotidian Uber ride's progression into a
    midnight therapy session. A script that I'd developed years ago, we cut it down to a more suitable length and shot
    it as a screen test for our Jeep prop.`,
    thumbnailUrl: md,
    thumbnailUrlGif: mdgif,
  },
  {
    videoId: 'klEVBSD7k84',
    title: 'The River',
    role: 'Director | Writer | Editor | VP Technician',
    description: `The River is a comedic Western short film about the last play in a Poker standoff. It was my first
    short film and the first narrative test of FSU's Virtual Production volume.`,
    thumbnailUrl: river,
    thumbnailUrlGif: rivergif,
  },
  {
    videoId: '4Ce2VZi9YGI',
    title: 'Airtab Media Teaser',
    role: 'Editor',
    description: `The teaser displayed in the hero section of the Airtab Media website. I edited it using clips from
    various Airtab Media-organized concerts to show the wide range of events that Airtab organizes.`,
    thumbnailUrl: airtab,
    thumbnailUrlGif: airtabgif,
  },
  {
    videoId: '9iRiZMCntXY',
    title: 'Control',
    role: 'VP Technician',
    description: `Control is an FSU student's thesis film, a music video about a universe-jumping assassin's
    confrontation with her latest target. I was the lead technician for the Virtual Production volume that the
    live-action portions of the film were shot using.`,
    thumbnailUrl: control,
    thumbnailUrlGif: controlgif,
  },
  {
    videoId: '1OaWBCMEDjE',
    title: 'Last Ride',
    role: 'Editor | VP Technician',
    description: `Last Ride is a comedic skit about an Uber driver's unfortunate ending. It is actually a number of test
    shots that I made into a narrative in the editing room- we didn't bother recording audio for our tests, so, I had
    to get creative.`,
    thumbnailUrl: lastride,
    thumbnailUrlGif: lastridegif,
  },
  {
    videoId: 'QFIvwBPdVFc',
    title: 'Find My Friends',
    role: 'Editor | VP Technician',
    description: `Find My Friends is a comedic horror-inspired short film about a pair of campers' visit to a new
    campsite. I acted as the editor and lead VP Technician on the project, which was shot on a Virtual
    Production volume.`,
    thumbnailUrl: fmf,
    thumbnailUrlGif: fmfgif,
  },
];

function Film() {
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
    const newRandomNumbers = Array.from({ length: videos.length }, () =>
      Math.floor((Math.random() * 2 - 1) * 2.5)
    );
    setRandomNumbers(newRandomNumbers);
  }, []);

  /* Thumbnail to gif overlay */
  // Preload GIFs
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

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * videos.length);
      toggleThumbnailState(randomIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Updated VideoThumbnail: Always display the JPEG and overlay the GIF when active.
  const VideoThumbnail = ({ video, onClick }) => {
    const index = videos.findIndex((v) => v.videoId === video.videoId);
    const currentThumbnailState = thumbnailStates[index];

    return (
      <div
        className="thumbnail"
        onClick={() => onClick(video)}
        style={{ position: 'relative', display: 'inline-block' }}
      >
        {/* Base JPEG image */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="thumbnail-image"
          style={{ position: 'relative', zIndex: 1 }}
        />
        {/* Overlay the GIF if it's active and preloaded */}
        {gifsPreloaded && currentThumbnailState === 'gif' && (
          <img
            src={video.thumbnailUrlGif}
            alt={video.title}
            className="thumbnail-image"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2,
            }}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div className="first_film" style={{ position: 'relative', zIndex: 1 }}>
        <FadeDiv text="Virtual Production Reel" className="header2" />
        <div className="column-container2" style={{ gap: '3vw', maxWidth: '80vw' }}>
          <div>
            <p className="body_no_padding" style={{color: "#e8e8e8", fontWeight: "500", opacity: ".9"}}>{vp_reel_desc}</p>
          </div>
          <div className="vp-reel-embed">
              <iframe
                height="100%"
                width="100%"
                src="https://www.youtube.com/embed/Kq8MBfpi8CM?autoplay=1&mute=1&playsinline=1&controls=1&loop=1&playlist=Kq8MBfpi8CM"
                title="Virtual Production Reel"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
        </div>
      </div>
      <div className="third_film" style={{ position: 'relative', zIndex: 1 }}>
        <div className="header2">Professional Portfolio</div>
        <div className="column-container" style={{ gap: '5vw' }}>
          <div className="slate_background">
            <div className="slate_background2">
              {(hoveredVideo || defaultVideo) && (
                <VideoDesc video={hoveredVideo || defaultVideo} onClose={unhoverVideo} />
              )}
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
              <VideoThumbnail video={video} onClick={openModal} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Radium(Film);
