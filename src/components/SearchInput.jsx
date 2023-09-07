import React, { useState } from 'react';
import styled from 'styled-components';

const StyledInputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 35px; /* Nagyító ikon a bal oldalon */
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledSearchIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 10px; /* Elhelyezzük a bal oldalon a nagyító ikont */
  transform: translateY(-50%);
  color: #888;
  cursor: pointer;
`;

export default function SearchInput({ movieTitle, movieTitleChange}) {

  return (
    <StyledInputContainer>
      <StyledSearchIcon>&#128269;</StyledSearchIcon>
      <StyledInput
        type="text"
        placeholder="Keresés..."
        value={movieTitle}
        onChange={(e) => movieTitleChange(e.target.value)}
      />
    </StyledInputContainer>
  );
}
