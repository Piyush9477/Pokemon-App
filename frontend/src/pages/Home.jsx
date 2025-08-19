import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPokemonList(data.results);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchPokemon();
  }, [offset]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="container">
      <h1>Pokémon List</h1>
      {loading && <div className="spinner"></div>}
      {error && <p className="error-message">Error: {error}</p>}
      <ul>
        {pokemonList.map(pokemon => (
          <li key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`}>{capitalizeFirstLetter(pokemon.name)}</Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button disabled={offset === 0} onClick={() => setOffset(offset - limit)}>Previous</button>
        <button onClick={() => setOffset(offset + limit)}>Next</button>
      </div>
    </div>
  );
}

export default Home;
