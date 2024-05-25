import { useEffect, useState } from "react";
import "./AppMovies.css";

export const AppMovies = () => {
  const API_KEY = "API_KEY";
  const URL_BASE = `https://api.themoviedb.org/3/search/movie`;
  const RANDOM_MOVIES_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1`;

  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchRandomMovies = async () => {
      try {
        const response = await fetch(RANDOM_MOVIES_URL);
        const data = await response.json();
        setMovieList(data.results);
      } catch (error) {
        console.error("Error fetching random movies:", error);
      }
    };

    fetchRandomMovies();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi();
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchApi = async () => {
    try {
      const res = await fetch(
        `${URL_BASE}?query=${search}&api_key=${API_KEY}&language=es-ES`
      );
      const data = await res.json();
      setMovieList(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="header__container">
        <div className="header__logo-container">
          <img
            width="100"
            height="100"
            src="https://img.icons8.com/keek/100/popcorn.png"
            alt="popcorn"
          />
          <h1>FILMOTECA</h1>
        </div>
        <form onSubmit={handleSubmit} className="header__form">
          <input
            type="text"
            placeholder="Ingresá una película"
            value={search}
            onChange={handleInputChange}
          />
          <input type="submit" value={"Buscar"} />
        </form>
      </div>
      {movieList && (
        <div className="movie-list">
          {movieList.map((movie) => (
            <div key={movie.id} className="movie-list__card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
              <h3>{`${movie.release_date}`}</h3>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
