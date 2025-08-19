const express = require("express");
const router = express.Router();
const {getPokemonList, getPokemonDetails} = require("../controllers/pokemonController");

router.get("/pokemon", getPokemonList);
router.get("/pokemon/:identifier", getPokemonDetails);

module.exports = router;