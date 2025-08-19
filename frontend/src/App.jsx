import React, { useEffect, useState } from "react";
import axios from "axios";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `http://localhost:5000/api/pokemon?page=${page}&limit=10`
        );
        setPokemon(res.data.results);
      } catch (err) {
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, [page]);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem" }}>
      <h1>Pokémon List</h1>

      {loading && <div className="loader" aria-label="Loading spinner"></div>}

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {!loading && !error && (
        <ul className="pokemon-grid" role="list" aria-live="polite" style={{ listStyle: "none", paddingLeft: 0 }}>
          {pokemon.map((poke) => (
            <li
              key={poke.name}
              className="pokemon-card"
              tabIndex="0"
              style={{ position: "relative", paddingLeft: "1.5em" }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#646cff",
                  fontWeight: "bold",
                }}
              >
                ➤
              </span>
              {capitalizeFirstLetter(poke.name)}
            </li>
          ))}
        </ul>
      )}

      <div
        style={{
          marginTop: 24,
          textAlign: "center",
        }}
      >
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <span
          style={{ margin: "0 12px", fontWeight: "bold" }}
          aria-live="polite"
          aria-atomic="true"
        >
          Page {page}
        </span>
        <button onClick={() => setPage((p) => p + 1)} aria-label="Next page">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
