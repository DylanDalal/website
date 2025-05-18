import { useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultSongs = [
  { name: "Tangerine Rays", artist: "Zedd" },
  { name: "Hurts", artist: "Calvin Harris & Alesso" },
  { name: "Where You Are", artist: "John Summit" },
  { name: "Words", artist: "Alesso" },
  { name: "Stay", artist: "Zedd" },
  { name: "Runaway", artist: "Galantis" },
  { name: "Hurricane", artist: "Galantis" },
  { name: "5 More Hours", artist: "Deorro" },
  { name: "Massive", artist: "Drake" },
  { name: "Neverender", artist: "Justice" },
  { name: "Go Back", artist: "John Summit" },
  { name: "Thinking Bout You", artist: "Calvin Harris" },
  { name: "Ghosts n Stuff", artist: "deadmau5" },
  { name: "Bangarang", artist: "Skrillex" },
  { name: "Cinema", artist: "Skrillex" },
  { name: "Rumble", artist: "Skrillex" }
];

// Repeat to make 25
const filledDefaults = Array.from({ length: 25 }, (_, i) => {
  return defaultSongs[i % defaultSongs.length];
});

export default function EditBingo() {
  const [songs, setSongs] = useState(filledDefaults);
  const navigate = useNavigate();

  const updateSong = (index, field, value) => {
    const updated = [...songs];
    updated[index][field] = value;
    setSongs(updated);
  };

  const startGame = () => {
    const filledSongs = songs.filter(song => song.name.trim() && song.artist.trim());
    if (filledSongs.length < 25) {
      alert("Please fill out all 25 songs before creating your card.");
      return;
    }

    const encoded = btoa(JSON.stringify(songs));
    const link = `${window.location.origin}/bingo/play?data=${encodeURIComponent(encoded)}`;

    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard! You can now share it.");
      navigate(`/bingo/play?data=${encodeURIComponent(encoded)}`);
    });
  };

  return (
    <div style={{ paddingTop: "10vh", paddingInline: "5vw", maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", fontFamily: "DINCondensed", textTransform: "uppercase" }}>
        Create Your Bingo Card
      </h2>
      <p style={{ textAlign: "center", opacity: 0.7, marginBottom: "2rem" }}>
        Customize or leave as-is to get started
      </p>

      {songs.map((s, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
            justifyContent: "center"
          }}
        >
          <input
            type="text"
            placeholder={`Song ${i + 1}`}
            value={s.name}
            onChange={(e) => updateSong(i, "name", e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #ccc",
              width: "45%"
            }}
          />
          <input
            type="text"
            placeholder="Artist"
            value={s.artist}
            onChange={(e) => updateSong(i, "artist", e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #ccc",
              width: "45%"
            }}
          />
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={startGame}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            textTransform: "uppercase",
            fontFamily: "DINCondensed",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Create My Bingo
        </button>
      </div>
    </div>
  );
}
