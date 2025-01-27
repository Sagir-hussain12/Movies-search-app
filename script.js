const API_KEY = "971b2571";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const sortSelect = document.getElementById("sort-select");
const movieList = document.getElementById("movie-list");
const movieDetails = document.getElementById("movie-details");
const backButton = document.getElementById("back-button");

const movieTitle = document.getElementById("movie-title");
const movieYear = document.getElementById("movie-year");
const movieGenre = document.getElementById("movie-genre");
const movieDirector = document.getElementById("movie-director");
const moviePlot = document.getElementById("movie-plot");
const moviePoster = document.getElementById("movie-poster");

// Search Movies
searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  searchMovies(searchTerm);
});

sortSelect.addEventListener("change", () => {
  const movies = Array.from(movieList.children);
  const sortOrder = sortSelect.value;
  movies.sort((a, b) => {
    const yearA = parseInt(a.dataset.year, 10);
    const yearB = parseInt(b.dataset.year, 10);
    if (sortOrder === "year-asc") {
      return yearA - yearB;
    } else {
      return yearB - yearA;
    }
  });

  movieList.innerHTML = "";
  movies.forEach((movie) => {
    movieList.appendChild(movie);
  });
});

// Fetch Movie Details
movieList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const imdbID = e.target.dataset.imdbid;
    fetchMovieDetails(imdbID);
  }
});

// Back to List
backButton.addEventListener("click", () => {
  movieDetails.style.display = "none";
  movieList.style.display = "block";
});

function searchMovies(searchTerm) {
  const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      movieList.innerHTML = "";

      if (data.Response === "True") {
        data.Search.forEach((movie) => {
          const li = document.createElement("li");
          li.textContent = `${movie.Title} (${movie.Year})`;
          li.dataset.imdbid = movie.imdbID;
          li.dataset.year = movie.Year;
          movieList.appendChild(li);
        });
      } else {
        movieList.innerHTML = `<li>No results found.</li>`;
      }
    });
}

function fetchMovieDetails(imdbID) {
  const url = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        movieList.style.display = "none";
        movieDetails.style.display = "block";

        movieTitle.textContent = data.Title;
        movieYear.textContent = data.Year;
        movieGenre.textContent = data.Genre;
        movieDirector.textContent = data.Director;
        moviePlot.textContent = data.Plot;
        moviePoster.src = data.Poster;
      }
    });
}
