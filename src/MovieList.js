
import React, { useState, useEffect } from "react";
import "./App.css";

const MovieList = ({ searchTerm, favorites, setFavorites }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Reset page when search term changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const query = searchTerm.trim() === "" ? "X-men" : searchTerm;
    setLoading(true);

    fetch(
      `http://www.omdbapi.com/?apikey=e5ccb18&s=${encodeURIComponent(
        query
      )}&type=movie&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          const fetchedMovies = data.Search;
          setTotalResults(Number(data.totalResults));
          setMovies((prev) => (page === 1 ? fetchedMovies : [...prev, ...fetchedMovies]));
        } else {
          setMovies([]);
          setTotalResults(0);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, [searchTerm, page]);

  const toggleFavorite = (movie) => {
    const alreadyFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (alreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, { imdbID: movie.imdbID, Title: movie.Title }]);
    }
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  return (
    <div className="MovieList">
      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length > 0 ? (
        <>
          <div className="movie-cards-container">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}
                  alt={movie.Title}
                  className="movie-poster"
                />
                <h3 className="movie-title">{movie.Title}</h3>
                <p className="movie-year">{movie.Year}</p>
                <button
                  onClick={() => toggleFavorite(movie)}
                  className="favorite-btn"
                >
                  {favorites.some((fav) => fav.imdbID === movie.imdbID)
                    ? "Unfavorite"
                    : "Favorite"}
                </button>
              </div>
            ))}
          </div>
          {searchTerm.trim() !== "" && movies.length < totalResults && (
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </>
      ) : (
        !loading && <p>No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;
