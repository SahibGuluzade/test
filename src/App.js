
import React, { useState } from "react";
import Pageheader from "./Pageheader";
import MovieList from "./MovieList";
import SearchInput from "./SearchInput";
import FavoriteList from "./FavoriteList";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState("movies");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [favoriteListName, setFavoriteListName] = useState("");

  return (
    <div className="App">
      <Pageheader />
      {activeView === "movies" ? (
        <div className="movies-container">
          <div className="movies-section">
            <SearchInput setSearchTerm={setSearchTerm} />
            <MovieList
              searchTerm={searchTerm}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </div>
          <div className="favorites-section">
            <FavoriteList
              favorites={favorites}
              setFavorites={setFavorites}
              activeView={activeView}
              setActiveView={setActiveView}
              favoriteListName={favoriteListName}
              setFavoriteListName={setFavoriteListName}
            />
          </div>
        </div>
      ) : (
        <FavoriteList
          favorites={favorites}
          setFavorites={setFavorites}
          activeView={activeView}
          setActiveView={setActiveView}
          favoriteListName={favoriteListName}
          setFavoriteListName={setFavoriteListName}
        />
      )}
    </div>
  );
}

export default App;
