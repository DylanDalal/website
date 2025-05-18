import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PlayBingo() {
  const [songs, setSongs] = useState([]);
  const [marked, setMarked] = useState(Array(25).fill(false));

  // ✅ Safely extract "data" param ONCE at the top
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const encoded = params.get("data");

  useEffect(() => {
    if (encoded) {
      try {
        const decoded = JSON.parse(atob(decodeURIComponent(encoded)));
        const shuffled = [...decoded].sort(() => 0.5 - Math.random());
        setSongs(shuffled);
      } catch (e) {
        console.error("Invalid bingo data", e);
      }
    }
  }, [encoded]);

  const toggle = (index) => {
    const newMarked = [...marked];
    newMarked[index] = !newMarked[index];
    setMarked(newMarked);
  };

  return (
    <div className="bingo">
      {songs.map((song, i) => (
        <div
          key={i}
          className="bingo-cell"
          onClick={() => toggle(i)}
          style={{
            backgroundColor: marked[i] ? "lightgreen" : "white",
            cursor: "pointer"
          }}
        >
          <p className="title">{song.name}</p>
          <p className="artist">{song.artist}</p>
        </div>
      ))}
    </div>
  );
}
