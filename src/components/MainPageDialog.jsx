import styled from 'styled-components';
import ReviewCard from './ReivewCard';
import { useEffect } from 'react';

const DialogWrapper = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75vw;

.scrollable-content {
  max-height: 75vh;
  overflow-y: auto;
}

.poster {
    width: 35vw;
    height: 70vh;
    grid-column: 1;
    grid-row: 1
}

.detailsGrid {
    display: grid;
}

.detailsGridTable {
    grid-column: 2;
    grid-row: 1;
    padding: 10px;
}

.detailsGridRowData {
    text-align: left
}
`;

export default function MainPageDialog({ selectedMovie, dialogOnHide }) {

    return (
        <DialogWrapper>
          <h2>{selectedMovie.title}</h2>
          <div className="scrollable-content">
            <div className="detailsGrid">
              <img
                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster}`}
                alt="Movie Poster"
                className='poster'
              />
              <div className='detailsGridTable'>
                <div>
                  <p>Leírás:</p>
                  <div className="detailsGridRowData">
                    {selectedMovie.overview}
                  </div>
                </div>
                <div>
                  <p>Szereplők:</p>
                  <div>
                    {selectedMovie.actors.join(",")}
                  </div>
                </div>
                <div>
                  <p>Rendező:</p>
                  <div>
                    {selectedMovie.directors.join(",")}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p>Értékelések:</p>
              {selectedMovie.reviews.map((review) => (
                <ReviewCard key={review.id} review={ review } />
              ))}
            </div>
          </div>
          <button onClick={dialogOnHide}>Bezárás</button>
        </DialogWrapper>
    )
}