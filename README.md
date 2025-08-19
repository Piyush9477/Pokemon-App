# Pokémon MERN Stack App

A web application that fetches and displays Pokémon data using the free [PokeAPI](https://pokeapi.co/). The app features a home page listing Pokémon names and a details page showing selected Pokémon information with images.

Tech Stack: Node.js, Express.js, React

---

## Features

- Fetches data from the public PokeAPI through a Node.js/Express backend.
- Clean and responsive React frontend built with Vite.
- Displays paginated Pokémon names on the home page.
- Clicking a Pokémon opens a details page showing:
  - Name
  - Image 
  - Height
  - Weight
  - Types
  - Abilities
- Backend filters data to reduce payload size and improve fetch speed.
- Loading state with animated spinner and user-friendly error handling.

---

## Getting Started

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Piyush9477/Pokemon-App.git
cd Pokemon-App
```

2. **Setup Backend**
```bash
cd backend
npm install
npm run dev
```
The backend runs on `http://localhost:5000` by default and exposes API endpoints:

- `GET /api/pokemon?limit=5&offset=0` - Paginated Pokémon list
- `GET /api/pokemon/:name` - Details for a Pokémon by name

3. **Setup Frontend**

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```
The frontend runs on `http://localhost:5173`. It communicates with the backend to fetch Pokémon data.