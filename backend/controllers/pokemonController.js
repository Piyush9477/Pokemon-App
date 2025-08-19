const axios = require('axios');

const getPokemonList = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Pokemon list' });
  }
};

const getPokemonDetails = async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Pokemon details' });
  }
};

module.exports = { getPokemonList, getPokemonDetails };
