import { styled } from "styled-components";
import SearchInput from "./SearchInput";
import PrimaryButton from "./PrimaryButton";
import MultiSelect from "./MultiSelect";
import { useEffect, useState } from "react";

const MainPageHeaderContent = styled.div`
  display: flex;
  padding: 10px;
`;

export default function MainPageHeader({
  movieTitle,
  setMovieTitle,
  searchButtonClick,
  setSearchedMovies,
  fetchOptions
}) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", fetchOptions)
      .then((response) => response.json())
      .then((response) => {
        setGenres(response.genres);
      })
      .catch((err) => console.error(err));
  }, [])
  return (
    <MainPageHeaderContent>
      <SearchInput
        movieTitle={movieTitle}
        movieTitleChange={(value) => setMovieTitle(value)}
      />
      <PrimaryButton id="searchButton" onClick={searchButtonClick}>Keresés</PrimaryButton>
      <MultiSelect options={genres} genreFilteredMovies={setSearchedMovies} />
    </MainPageHeaderContent>
  );
}
