const express = require("express");
const axios = require("axios");
const cors = require("cors");
const pokemonRoutes = require("./routes/pokemonRoutes");

const app = express();
app.use(cors());

// Pokemon Routes
app.use("/api", pokemonRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
