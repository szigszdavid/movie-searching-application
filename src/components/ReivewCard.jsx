import { styled } from "styled-components";

const ReviewCardElement = styled.div`
  border: 1px solid black;
  margin: 10px;
`;

const ReviewCardElementHeader = styled.div`
  display: grid;
  padding: "10px";

  .cardHeaderUsername {
    padding: 5px;
    grid-row: 1;
    grid-column: 1;
    display: flex;
    justify-content: flex-start;
  }

  .cardHeaderDate {
    padding: 5px;
    grid-row: 1;
    grid-column: 2;
    display: flex;
    justify-content: flex-end;
  }
`;

const ReviewCardElementContent = styled.div`
  border-top: 1px solid black;
  text-align: left;
  padding: 10px;
`;

export default function ReviewCard({ review }) {
  return (
    <ReviewCardElement>
      <ReviewCardElementHeader>
        <div className="cardHeaderUsername">{review.username}</div>
        <div className="cardHeaderDate">{review.updatedAt}</div>
      </ReviewCardElementHeader>
      <ReviewCardElementContent>
        {review.content}
      </ReviewCardElementContent>
    </ReviewCardElement>
  );
}
