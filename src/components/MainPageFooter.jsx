import PrimaryButton from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

export default function MainPageFooter({
  totalPages,
  currentPage,
  searchedMovieWithPageNumber,
  setCurrentPage
}) {
  
  let buttons = [];
  if (totalPages > 0) {
    for (let index = 0; index < totalPages; index++) {
      buttons.push(
        currentPage == index + 1 ? (
          <PrimaryButton
            key={index}
            onClick={() => handlePageButtonOnClick(index + 1)}
            style={{
              backGroundColor: currentPage == index + 1 ? "#007bff" : "#f2f2f2",
            }}
          >
            {index + 1}
          </PrimaryButton>
        ) : (
          <SecondaryButton
            key={index}
            onClick={() => handlePageButtonOnClick(index + 1)}
          >
            {index + 1}
          </SecondaryButton>
        )
      );
    }
  }

  const handlePageButtonOnClick = (page) => {
    setCurrentPage(page);
    searchedMovieWithPageNumber(page);
  };

  return <>{buttons}</>;
}
