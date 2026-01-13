import React, { useState, useEffect } from 'react';
import Radium from 'radium';
import '../App.css';
import './Film.css';
import './Home.css';
import './Tech.css';
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
import lsbgif from '../resources/film/lisbeth.gif';
import fcrvgif from '../resources/film/fcrv.gif';
import fcrv from '../resources/film/fcrv.jpg';
import fmc1gif from '../resources/film/fmc1.gif';
import jpgif from '../resources/film/jp.gif';
import jp from '../resources/film/jp.jpg';
import jpbrgif from '../resources/film/jpbr.gif';
import sxsw from '../resources/film/sxsw.png';
import itEnds from '../resources/film/it_ends.jpeg';
import rottenTomatoes from '../resources/film/rotten_tomatoes.jpg';
import variety from '../resources/film/variety.jpg';
import editingReelThumb from '../resources/film/editing_reel.jpg';
import vpReelThumb from '../resources/film/vp_reel.jpg';


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

const vp_reel_desc = `Built and operated the virtual production pipeline for Florida State University’s LED stage, supporting feature films, tests, 
and short-form productions across Unreal, Disguise, and on-set data workflows.
Responsible for keeping camera, assets, and metadata moving cleanly from set through post-production.`;

const editing_reel_desc = `Selected narrative and commercial work with an emphasis on pacing and clear focus. My complete portfolio 
includes short films, branded content, and social-first video designed to deliver story in the most efficient way possible.`;

const sxsw_desc = `I served as Pipeline Technical Director on the SXSW-premiered feature film It Ends, ensuring footage, assets, and metadata moved cleanly from set through editorial and post-production.`;


const videos = [
  {
    videoId: 'dCT-SM94qFo',
    title: 'Boss of the Month',
    role: 'Director | Writer | Editor | VP Operator',
    description: `Boss of the Month is a comedic short film about a bakery employee that has to deal with a strange-
    yet familiar- customer. It was shot on a Virtual Production volume, and though it has some glaring audio issues,
    it's my personal favorite short film I've made.`,
    thumbnailUrl: botm,
    thumbnailUrlGif: botmgif,
  },
  {
    videoId: 'XQjtRLgWvfE',
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
    role: 'Director | Writer | Editor | VP Operator',
    description: `Monotonous Dejection is a dramatic short film about a quotidian Uber ride's progression into a
    midnight therapy session. A script that I'd developed years ago, we cut it down to a more suitable length and shot
    it as a screen test for our Jeep prop.`,
    thumbnailUrl: md,
    thumbnailUrlGif: mdgif,
  },
  {
    videoId: 'klEVBSD7k84',
    title: 'The River',
    role: 'Director | Writer | Editor | VP Operator',
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
    role: 'VP Operator',
    description: `Control is an FSU student's thesis film, a music video about a universe-jumping assassin's
    confrontation with her latest target. I was the lead researcher for the Virtual Production volume used by the
    live-action portions of this film.`,
    thumbnailUrl: control,
    thumbnailUrlGif: controlgif,
  },
  {
    videoId: '1OaWBCMEDjE',
    title: 'Last Ride',
    role: 'Editor | VP Operator',
    description: `Last Ride is a comedic skit about an Uber driver's unfortunate ending. It is actually a number of test
    shots that I made into a narrative in the editing room- we didn't bother recording audio for our tests, so, I had
    to get creative.`,
    thumbnailUrl: lastride,
    thumbnailUrlGif: lastridegif,
  },
  {
    videoId: 'QFIvwBPdVFc',
    title: 'Find My Friends',
    role: 'Editor | VP Operator',
    description: `Find My Friends is a comedic horror-inspired short film about a pair of campers' visit to a new
    campsite. I acted as the editor and lead VP Operator on the project, which was shot on a Virtual
    Production volume.`,
    thumbnailUrl: fmf,
    thumbnailUrlGif: fmfgif,
  },
  {
    videoId: 'qQgWRWEiCQM',
    title: '"Reliability" Ad',
    role: 'Editor',
    description: `Web advertisement made for Fender Marine Construction in collaboration with Rock Paper Simple. I was
    brought in as an editor to help with the project.`,
    thumbnailUrl: fmc1gif,
    thumbnailUrlGif: fmc1gif,
  },
  {
    videoId: '4hzdqTxiRss',
    title: 'Lisbeth "About" Video',
    role: 'Director | Editor',
    description: `Video providing background and introducing the artist behind Etsy shop LisBETH Silk.`,
    thumbnailUrl: 'https://img.youtube.com/vi/4hzdqTxiRss/maxresdefault.jpg',
    thumbnailUrlGif: 'https://img.youtube.com/vi/4hzdqTxiRss/maxresdefault.jpg',
  },
  {
    videoId: 'sfXZT0dHuuc',
    title: '"Bonus Rooms" Ad',
    role: 'Director | Editor',
    description: `Advertisement made for Jackson Properties meant to excite potential renters about the opportunities
    proivided by renting a home with a bonus room.`,
    thumbnailUrl: 'https://img.youtube.com/vi/sfXZT0dHuuc/maxresdefault.jpg',
    thumbnailUrlGif: jpbrgif,
  },
  {
    videoId: '3u2WLj3WQp8',
    title: 'Fender Marine Construction',
    role: 'Editor',
    description: `Website banner video for Fender Marine Construction in collaboration with Rock Paper Simple. I was
    brought in as an editor to help with the project.`,
    thumbnailUrl: 'https://img.youtube.com/vi/3u2WLj3WQp8/maxresdefault.jpg',
    thumbnailUrlGif: 'https://img.youtube.com/vi/3u2WLj3WQp8/maxresdefault.jpg',
  },
  {
    videoId: 'briKVzcxssA',
    title: '"Trust" Ad',
    role: 'Editor',
    description: `Web advertisement made for Fender Marine Construction in collaboration with Rock Paper Simple. I was
    brought in as an editor to help with the project.`,
    thumbnailUrl: 'https://img.youtube.com/vi/briKVzcxssA/maxresdefault.jpg',
    thumbnailUrlGif: 'https://img.youtube.com/vi/briKVzcxssA/maxresdefault.jpg',
  },
  {
    videoId: 'yLO1iPC0U6U',
    title: 'Resort Teaser',
    role: 'Director | Editor',
    description: `Website banner video for Florida Caverns RV Resort. I organized the shoot and edited the video,
                  capturing the beauty of the area and the amenities available to guests.`,
    thumbnailUrl: fcrv,
    thumbnailUrlGif: fcrvgif,
  },
  
  {
    videoId: 'vjgyIm2Jm0s',
    title: 'Jackson Properties Banner',
    role: 'Director | Editor',
    description: `The teaser displayed in the hero section of the Jackson Properties website. I traveled to 
    Tallahassee to film clips across two trips, and coordinated with current residents and employees to 
    create a video promoting the different homes available for rent.`,
    thumbnailUrl: jp,
    thumbnailUrlGif: jpgif,
  },
];

function Film() {
  const [defaultVideo, setDefaultVideo] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [editingReelVideoId, setEditingReelVideoId] = useState('0wZx9gpywJ0'); // Default editing reel
  const [vpReelVideoId, setVpReelVideoId] = useState('Kq8MBfpi8CM'); // Default VP reel

  // Selected videos for highlighted work sections
  const editingReelHighlights = [
    { videoId: '0wZx9gpywJ0', title: 'Editing Reel', thumbnailUrl: editingReelThumb, thumbnailUrlGif: editingReelThumb }, // Editing Reel
    videos.find(v => v.videoId === 'XQjtRLgWvfE'), // Open for an Icon
    videos.find(v => v.videoId === 'dCT-SM94qFo'), // Boss of the Month
  ].filter(Boolean);

  const vpReelHighlights = [
    { videoId: 'Kq8MBfpi8CM', title: 'Virtual Production Reel', thumbnailUrl: vpReelThumb, thumbnailUrlGif: vpReelThumb }, // VP Reel
    videos.find(v => v.videoId === '9iRiZMCntXY'), // Control
    videos.find(v => v.videoId === 'klEVBSD7k84'), // The River
  ].filter(Boolean);

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
  
  // State for reel highlight thumbnails - initialize after highlights are defined
  const [editingReelThumbnailStates, setEditingReelThumbnailStates] = useState(editingReelHighlights.map(() => 'jpeg'));
  const [vpReelThumbnailStates, setVpReelThumbnailStates] = useState(vpReelHighlights.map(() => 'jpeg'));

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

  // Toggle reel highlight thumbnails
  useEffect(() => {
    if (!gifsPreloaded) return;

    const editingInterval = setInterval(() => {
      if (editingReelHighlights.length > 0) {
        const randomIndex = Math.floor(Math.random() * editingReelHighlights.length);
        setEditingReelThumbnailStates(prev => {
          const newStates = [...prev];
          newStates[randomIndex] = prev[randomIndex] === 'jpeg' ? 'gif' : 'jpeg';
          return newStates;
        });
      }
    }, 5000);

    const vpInterval = setInterval(() => {
      if (vpReelHighlights.length > 0) {
        const randomIndex = Math.floor(Math.random() * vpReelHighlights.length);
        setVpReelThumbnailStates(prev => {
          const newStates = [...prev];
          newStates[randomIndex] = prev[randomIndex] === 'jpeg' ? 'gif' : 'jpeg';
          return newStates;
        });
      }
    }, 5000);

    return () => {
      clearInterval(editingInterval);
      clearInterval(vpInterval);
    };
  }, [gifsPreloaded]);

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

  // ReelThumbnail component for highlighted work
  const ReelThumbnail = ({ video, onClick, thumbnailStates, index }) => {
    const currentThumbnailState = thumbnailStates[index];

    return (
      <div
        onClick={() => onClick(video)}
        style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
      >
        {/* Base JPEG image */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="reel-highlight-thumbnail"
          style={{ position: 'relative', zIndex: 1 }}
        />
        {/* Overlay the GIF if it's active and preloaded */}
        {gifsPreloaded && currentThumbnailState === 'gif' && (
          <img
            src={video.thumbnailUrlGif}
            alt={video.title}
            className="reel-highlight-thumbnail"
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
      <div className="sxsw_film" style={{ position: 'relative', zIndex: 1 }}>
        <div className="sxsw_film_bg" style={{ backgroundImage: `url(${sxsw})` }}></div>
        <div className="column-container" style={{ padding: '0 10vw 0 10vw', position: 'relative', zIndex: 1 }}>
          <div style={{color: '#fff', display: 'flex', alignItems: 'start', overflow: 'visible', flexDirection: 'column' }}>
          <div className="header_pipeline" style={{ color: '#fff' }}>SXSW Feature Film</div>
            <div className="body_no_padding" style={{ color: '#fff' }}>{sxsw_desc}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'visible', position: 'relative' }}>
            <img src={itEnds} alt="It Ends poster" style={{ maxWidth: '100%', maxHeight: '50vh', height: 'auto', width: 'auto', objectFit: 'contain', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }} />
            <a href="https://www.rottentomatoes.com/m/it_ends" target="_blank" rel="noopener noreferrer" className="sxsw_logo_link sxsw_rt_logo">
              <img src={rottenTomatoes} alt="Rotten Tomatoes" />
            </a>
            <a href="https://variety.com/2025/film/markets-festivals/neon-buys-gen-z-road-thriller-it-ends-sxsw-1236611747/" target="_blank" rel="noopener noreferrer" className="sxsw_logo_link sxsw_variety_logo">
              <img src={variety} alt="Variety" />
            </a>
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
      <div className="first_film" style={{ position: 'relative' }}>
        <FadeDiv text="Highlights" className="header2" />
        <div className="column-container2" style={{ gap: '3vw', maxWidth: '80vw' }}>
          <div>
            <div className="header2_pipeline" style={{ paddingBottom: '0px', whiteSpace: 'nowrap', paddingTop: '15px'}}>
              Editing
            </div>
            <p className="body_no_padding" style={{color: "#e8e8e8", fontWeight: "500", opacity: ".9"}}>{editing_reel_desc}</p>
            <div style={{ maxWidth: '80vw', margin: '0 auto', paddingTop: '0vh' }}>
          <div className="reel-highlights-grid">
            {editingReelHighlights.map((video, index) => (
              <ReelThumbnail
                key={video.videoId}
                video={video}
                onClick={(video) => setEditingReelVideoId(video.videoId)}
                thumbnailStates={editingReelThumbnailStates}
                index={index}
              />
            ))}
          </div>
        </div>
          </div>
          <div className="vp-reel-embed">
              <iframe
                height="100%"
                width="100%"
                src={`https://www.youtube.com/embed/${editingReelVideoId}?autoplay=1&mute=1&playsinline=1&controls=1&loop=1&playlist=${editingReelVideoId}`}
                title="Editing Reel"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                key={editingReelVideoId}
              />
            </div>
        </div>
      </div>
      <div className="first_film" style={{ position: 'relative', zIndex: 1 }}>
        <div className="column-container2" style={{ gap: '3vw', maxWidth: '80vw' }}>
          <div>
            <div className="header2_pipeline" style={{ paddingBottom: '0px', whiteSpace: 'nowrap', paddingTop: '15px'}}>
              VIRTUAL PRODUCTION 
            </div>
            <p className="body_no_padding" style={{color: "#e8e8e8", fontWeight: "500", opacity: ".9"}}>{vp_reel_desc}</p>
            <div className="reel-highlights-grid">
            {vpReelHighlights.map((video, index) => (
              <ReelThumbnail
                key={video.videoId}
                video={video}
                onClick={(video) => setVpReelVideoId(video.videoId)}
                thumbnailStates={vpReelThumbnailStates}
                index={index}
              />
            ))}
          </div>
          </div>
          <div className="vp-reel-embed">
              <iframe
                height="100%"
                width="100%"
                src={`https://www.youtube.com/embed/${vpReelVideoId}?autoplay=1&mute=1&playsinline=1&controls=1&loop=1&playlist=${vpReelVideoId}`}
                title="Virtual Production Reel"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                key={vpReelVideoId}
              />
            </div>
        </div>
      </div>
    </>
  );
}

export default Radium(Film);
