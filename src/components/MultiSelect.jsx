import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";

const CheckboxGroupWrapper = styled.div`
  margin-left: 10px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 25vw;
  .scrollable-content {
    max-height: 30vh;
    overflow-y: auto;
  }
`;
const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
`;

const CheckboxGroup = ({ options, genreFilteredMovies }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showMultiSelect, setShowMultiSelect] = useState(false);
  const fetchOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzU2MGZhYzAxYzA4M2EyZTQ4OGFkYmQ0NWM4OGEwNiIsInN1YiI6IjY0ZjM5YzE1M2Q0M2UwMDBhY2ZkNjljNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SMJ64UiOaqMLola1D7hFbmwRuRhZefsGrR_BdEbH1io",
    },
  };

  const handleCheckboxChange = (event) => {
    if (!selectedOptions.includes(parseInt(event.target.value))) {
      setSelectedOptions([...selectedOptions, parseInt(event.target.value)]);
    } else {
      setSelectedOptions(
        selectedOptions.filter(
          (option) => option !== parseInt(event.target.value)
        )
      );
    }
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?page=${1}&with_genres=${selectedOptions.join(
        ","
      )}`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((response) => {
        genreFilteredMovies(response.results);
      })
      .catch((err) => console.error(err));
  }, [selectedOptions]);

  const toogleMultiselect = () => {
    setShowMultiSelect(!showMultiSelect);
  };

  return (
    <div>
      <PrimaryButton onClick={toogleMultiselect}>Szűrés</PrimaryButton>
      {showMultiSelect && (
        <CheckboxGroupWrapper hidden={!showMultiSelect}>
          <div className="scrollable-content">
            {options.map((option) => (
              <CheckboxLabel key={option.id}>
                <CheckboxInput
                  type="checkbox"
                  value={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onChange={handleCheckboxChange}
                />
                {option.name}
              </CheckboxLabel>
            ))}
          </div>
          <PrimaryButton onClick={() => setSelectedOptions([])}>
            Szűrések törlése
          </PrimaryButton>
        </CheckboxGroupWrapper>
      )}
    </div>
  );
};

export default CheckboxGroup;
