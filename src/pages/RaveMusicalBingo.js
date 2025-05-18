import React, { useEffect, useRef, useMemo } from "react";
import './Bingo.css';

const songs = [
    { name: "Where You Are", artist: "John Summit", apple_music: 'apple.com'},
    { name: "10:35", artist: "Tiesto", apple_music: 'apple.com' },
    { name: "React", artist: "Switch Disco", apple_music: 'apple.com' },
    { name: "Afraid to Feel", artist: "LF SYSTEM", apple_music: 'apple.com' },
    { name: "Where You Are", artist: "John Summit", apple_music: 'apple.com'},
    { name: "10:35", artist: "Tiesto", apple_music: 'apple.com' },
    { name: "React", artist: "Switch Disco", apple_music: 'apple.com' },
    { name: "Afraid to Feel", artist: "LF SYSTEM", apple_music: 'apple.com' },
    { name: "Where You Are", artist: "John Summit", apple_music: 'apple.com'},
    { name: "10:35", artist: "Tiesto", apple_music: 'apple.com' },
    { name: "React", artist: "Switch Disco", apple_music: 'apple.com' },
    { name: "Afraid to Feel", artist: "LF SYSTEM", apple_music: 'apple.com' },
    { name: "Where You Are", artist: "John Summit", apple_music: 'apple.com'},
    { name: "10:35", artist: "Tiesto", apple_music: 'apple.com' },
    { name: "React", artist: "Switch Disco", apple_music: 'apple.com' },
    { name: "Afraid to Feel", artist: "LF SYSTEM", apple_music: 'apple.com' },
    { name: "Where You Are", artist: "John Summit", apple_music: 'apple.com'},
    { name: "10:35", artist: "Tiesto", apple_music: 'apple.com' },
    { name: "React", artist: "Switch Disco", apple_music: 'apple.com' },
    { name: "Afraid to Feel", artist: "LF SYSTEM", apple_music: 'apple.com' },
    { name: "Afraid to Feel", artist: "LF SYSTEM", apple_music: 'apple.com' },
    { name: "Where You Are", artist: "John Summit", apple_music: 'apple.com'},
    { name: "10:35", artist: "Tiesto", apple_music: 'apple.com' },
    { name: "React", artist: "Switch Disco", apple_music: 'apple.com' },
    { name: "Afraid to Feel", artist: "LF SYSTEM", apple_music: 'apple.com' },
  ];


export default function Bingo() {

const songRefs = useRef([]);

const choices = useMemo(
    () => songs.map(() => 0.6 + Math.random() * 0.4), // 0.6-1.4
    [songs.length]
);

  return (
      <div className="bingo">
        {songs.map((song, i) => (
            <div className="bingo-cell">
               <p className="title">{song.name}</p>
               <p className="artist">{song.artist}</p>
            </div>
        ))}
      </div>
  );
}
