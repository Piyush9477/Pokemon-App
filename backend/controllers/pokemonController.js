const axios = require('axios');

const getPokemonList = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

    const filteredResults = response.data.results.map(pokemon => ({ name: pokemon.name }));

    res.json({count: response.data.count, next: response.data.next, previous: response.data.previous, results: filteredResults});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Pokemon list' });
  }
};

const getPokemonDetails = async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

    const data = response.data;

    const filteredData = {
      name: data.name,
      sprites: {
        front_default: data.sprites.front_default
      },
      height: data.height,
      weight: data.weight,
      types: data.types.map(t => t.type.name),
      abilities: data.abilities.map(a => a.ability.name)
    };

    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Pokemon details' });
  }
};

module.exports = { getPokemonList, getPokemonDetails };
