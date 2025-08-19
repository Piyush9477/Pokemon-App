// Get paginated list of Pokémon names + types
const getPokemonList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    try {
        // Get basic Pokémon list
        const pokeListRes = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    
        // For each Pokémon, fetch its details for types
        const detailedPromises = pokeListRes.data.results.map((poke) => axios.get(poke.url));
        const detailedResults = await Promise.all(detailedPromises);
    
        // Map to name and types
        const listWithTypes = detailedResults.map((res) => ({
            name: res.data.name,
            types: res.data.types.map((t) => t.type.name),
        }));
    
        res.json({
            count: pokeListRes.data.count,
            results: listWithTypes,
        });
    } catch (err) {
        console.error("Backend error:", err.message);
        res.status(500).json({ error: "Failed to fetch Pokémon list" });
    }
}

// Get detailed Pokémon info by name or id
const getPokemonDetails = async (req, res) => {
    const { identifier } = req.params;
    try {
        const pokeDetailRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
        res.json(pokeDetailRes.data);
    } catch (err) {
        console.error("Backend error:", err.message);
        res.status(500).json({ error: "Failed to fetch Pokémon details" });
    }
}

module.exports = {getPokemonList, getPokemonDetails};