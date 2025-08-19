import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/pokemon/${name}`);
        if (!response.ok) throw new Error('Failed to fetch details');
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [name]);

  if (loading) return <div className="spinner"></div>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!pokemon) return null;

  return (
    <div className="container">
      <h1>{pokemon.name}</h1>
      <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p className="details-info">Height: {pokemon.height}</p>
      <p className="details-info">Weight: {pokemon.weight}</p>
      <p className="details-info">Types: {pokemon.types.join(', ')}</p>
      <p className="details-info">Abilities: {pokemon.abilities.join(', ')}</p>
      <Link className="back-link" to="/">← Back to List</Link>
    </div>
  );
}

export default PokemonDetails;
