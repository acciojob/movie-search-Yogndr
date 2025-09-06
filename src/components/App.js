import React, { useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [movie, setMovie] = useState("");
  const [fullinfo, setFullInfo] = useState([]);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    if (!movie) return;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(movie)}&apikey=99eb9fd1`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setFullInfo(data.Search);
        setError("");
      } else {
        setFullInfo([]);
        setError("Invalid movie name. Please try again.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setFullInfo([]);
      setError("Something went wrong. Please try again.");
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    fetchMovies();
  };

  return (
    <div>
      <h2>🎬 Movie Search</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="Enter movie name"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul>
        {fullinfo.map((info) => (
          <li key={info.imdbID}>
            <h4>
              {info.Title} ({info.Year})
            </h4>
            <img
              src={
                info.Poster !== "N/A"
                  ? info.Poster
                  : "https://via.placeholder.com/100"
              }
              alt={info.Title}
              width="100"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
