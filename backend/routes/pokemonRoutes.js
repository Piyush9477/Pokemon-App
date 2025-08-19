const express = require('express');
const router = express.Router();
const { getPokemonList, getPokemonDetails } = require('../controllers/pokemonController');

router.get('/', getPokemonList);
router.get('/:name', getPokemonDetails);

module.exports = router;
