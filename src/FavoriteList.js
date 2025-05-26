import React, { useState } from "react";
import "./App.css";

const FavoriteList = ({
  favorites,
  setFavorites,
  activeView,
  setActiveView,
  favoriteListName,
  setFavoriteListName,
}) => {
  const [inputListName, setInputListName] = useState("");

  if (activeView === "movies") {
    return (
      <div className="FavoriteList">
        <div className="favorite-movies-preview">
          {favorites.length === 0 ? (
            <p>No favorite movies yet.</p>
          ) : (
            favorites.map((movie) => (
              <div key={movie.imdbID} className="favorite-movie-item">
                <p>{movie.Title}</p>
                <button
                  className="remove-btn"
                  onClick={() =>
                    setFavorites(
                      favorites.filter((m) => m.imdbID !== movie.imdbID)
                    )
                  }
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>
        <div className="favorite-list-controls">
          <input
            type="text"
            placeholder="Favorite List Name"
            value={inputListName}
            onChange={(e) => setInputListName(e.target.value)}
          />
          <br />
          <button
            onClick={() => {
              if (inputListName.trim() === "") {
                alert("Please enter a list name");
              } else {
              
                setFavoriteListName(inputListName);
                setActiveView("favorites");
              }
            }}
          >
            Add Favorite List
          </button>
          <button onClick={() => setActiveView("favorites")}>
            Go to list
          </button>
        </div>
      </div>
    );
  } else {

    return (
      <div className="FavoriteList favorite-view">
        <h2>{favoriteListName ? favoriteListName : "Your Favorite List"}</h2>
        <div className="favorite-movies-view">
          {favorites.length === 0 ? (
            <p>No favorite movies in the list.</p>
          ) : (
            favorites.map((movie) => (
              <div key={movie.imdbID} className="favorite-movie-item">
                <p>{movie.Title}</p>
                <button
                  className="imdb-btn"
                  onClick={() =>
                    window.open(
                      `https://www.imdb.com/title/${movie.imdbID}`,
                      "_blank"
                    )
                  }
                >
                  IMDb
                </button>
              </div>
            ))
          )}
        </div>
        <button className="movies-btn" onClick={() => setActiveView("movies")}>
          Movies
        </button>
      </div>
    );
  }
};

export default FavoriteList;
