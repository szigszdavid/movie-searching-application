import styled from "styled-components";
import { useState, useEffect } from "react";

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .title {
      color: blue;
      cursor: pointer;
    }

    .clickable-header {
      cursor: pointer;
    }
  `;

export default function MainPageDataTable({searchedMovies, setSearchedMovies, fetchOptions, setMovieTitle, showDetails, sortBy, setSortBy}) {
  
  useEffect(() => {
    setMovieTitle()
    if (sortBy !== "") {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?page=${1}&sort_by=${sortBy}`,
        fetchOptions
      )
        .then((response) => response.json())
        .then((response) => {
          setSearchedMovies(response.results);
        })
        .catch((err) => console.error(err));
    }
  }, [sortBy]);

  const releaseDateArrow =
    sortBy == "primary_release_date.asc"
      ? "⬆"
      : sortBy == "primary_release_date.desc"
      ? "⬇"
      : "";
  const voteCountArrow =
    sortBy == "vote_count.asc" ? "⬆" : sortBy == "vote_count.desc" ? "⬇" : "";

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Cím</th>
          <th
            className="clickable-header"
            onClick={() =>
              setSortBy(
                sortBy === "primary_release_date.asc"
                  ? "primary_release_date.desc"
                  : "primary_release_date.asc"
              )
            }
          >
            Megjelenési év {releaseDateArrow}
          </th>
          <th
            className="clickable-header"
            onClick={() =>
                setSortBy(
                sortBy === "vote_count.asc"
                  ? "vote_count.desc"
                  : "vote_count.asc"
              )
            }
          >
            Értékelés {voteCountArrow}
          </th>
        </tr>
      </thead>
      <tbody>
        {searchedMovies.map((searchedMovie) => (
          <tr key={searchedMovie.id}>
            <td
              className="title"
              onClick={() => showDetails(searchedMovie.id)}
            >
              {searchedMovie.title}
            </td>
            <td>{searchedMovie.releaseYear}</td>
            <td>{searchedMovie.rating}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}
