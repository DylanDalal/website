import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditBingo() {
  const [songs, setSongs] = useState(
    Array.from({ length: 25 }, () => ({ name: "", artist: "" }))
  );
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

    const encoded = btoa(JSON.stringify(songs)); // unshuffled
    const link = `${window.location.origin}/bingo/play?data=${encodeURIComponent(encoded)}`;

    // Copy to clipboard and navigate
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
        Enter 25 songs you might hear at the rave
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
