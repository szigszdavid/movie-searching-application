import React, { useState, useEffect, useRef } from "react";
import MainPageDataTable from "./MainPageDataTable";
import MainPageHeader from "./MainPageHeader";
import MainPageFooter from "./MainPageFooter";
import MainPageDialog from "./MainPageDialog";

export default function MainPage() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json"
    },
  };
  const [movieTitle, setMovieTitle] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({
    id: null,
    title: "",
    overview: "",
    actors: [],
    directors: [],
    reviews: [],
  });
  const [totalPages, setTotalPages] = useState(1);
  const [visible, setVisible] = useState(false);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    callBasicList();
  }, []);

  useEffect(() => {
    if (detailsLoading > 0) {
      fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie.id}?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setSelectedMovie((prevData) => ({
            ...prevData,
            title: response.title,
            overview: response.overview,
            poster: response.poster_path,
          }));

          setDetailsLoading(detailsLoading - 1);
        })
        .catch((err) => console.error(err));

      fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setSelectedMovie((prevData) => ({
            ...prevData,
            actors: [
              ...new Set(
                response.crew
                  .filter((member) => member.known_for_department === "Acting")
                  .map((member) => member.name)
                  .concat(
                    response.cast
                      .filter(
                        (member) => member.known_for_department === "Acting"
                      )
                      .map((member) => member.name)
                  )
              ),
            ],
            directors: [
              ...new Set(
                response.crew
                  .filter(
                    (member) => member.known_for_department === "Directing"
                  )
                  .map((member) => member.name)
                  .concat(
                    response.cast
                      .filter(
                        (member) => member.known_for_department === "Directing"
                      )
                      .map((member) => member.name)
                  )
              ),
            ],
          }));

          setDetailsLoading(detailsLoading - 1);
        })
        .catch((err) => console.error(err));

      fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie.id}/reviews?language=en-US&page=1`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setSelectedMovie((prevData) => ({
            ...prevData,
            reviews: response.results.map((result) => {
              return {
                id: result.id,
                username: result.author_details.username,
                updatedAt: result.updated_at,
                content: result.content,
              };
            }),
          }));

          setDetailsLoading(detailsLoading - 1);
        })
        .finally(() => {
          setReviewsLoaded(true);
        })
        .catch((err) => console.error(err));
    }
    if (detailsLoading === 0) {
      setVisible(true);
    }
  }, [detailsLoading, reviewsLoaded]);

  const callBasicList = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?page=${1}`, options)
      .then((response) => response.json())
      .then((response) => handleSetSearchedMovies(response.results))
      .catch((err) => console.error(err));
  };

  const handleSearchButtonClick = () => {
    setCurrentPage(1);
    setSortBy("")
    if (movieTitle != "") {
      callSearchedMovieWithPageNumber(1);
    } else {
      callBasicList();
    }
  };

  const handleSetSearchedMovies = (newSearchedMovies) => {
    setSearchedMovies(
      newSearchedMovies.map((newSearchedMovie) => {
        return {
          id: newSearchedMovie.id,
          title: newSearchedMovie.title,
          releaseYear: newSearchedMovie.release_date.split("-")[0],
          rating: newSearchedMovie.vote_average,
        };
      })
    );
  };

  const callSearchedMovieWithPageNumber = (page) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setTotalPages(response.total_pages);
        handleSetSearchedMovies(response.results);
      })
      .catch((err) => console.error(err));
  };

  const handleShowDetails = (id) => {
    setSelectedMovie((prevData) => ({
      ...prevData,
      id: id,
    }));
    setDetailsLoading(3);
  };

  const handleDialogOnHide = () => {
    setDetailsLoading(-1);
    setVisible(false);
    setReviewsLoaded(false);
  };

  return (
    <>
      <MainPageHeader
        movieTitle={movieTitle}
        setMovieTitle={(value) => setMovieTitle(value)}
        searchButtonClick={handleSearchButtonClick}
        setSearchedMovies={handleSetSearchedMovies}
        fetchOptions={options}
      />
      <MainPageDataTable
        searchedMovies={searchedMovies}
        setSearchedMovies={handleSetSearchedMovies}
        setMovieTitle={() => setMovieTitle("")}
        fetchOptions={options}
        showDetails={(value) => handleShowDetails(value)}
        sortBy={sortBy}
        setSortBy={(value) => setSortBy(value)}
      />
      {visible && (
        <MainPageDialog
          selectedMovie={selectedMovie}
          dialogOnHide={handleDialogOnHide}
        />
      )}
      <MainPageFooter
        totalPages={totalPages}
        currentPage={currentPage}
        searchedMovieWithPageNumber={(value) =>
          callSearchedMovieWithPageNumber(value)
        }
        setCurrentPage={(value) => setCurrentPage(value)}
      />
    </>
  );
}
