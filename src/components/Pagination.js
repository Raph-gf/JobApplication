import {
  paginationEl,
  paginationBtnNextEl,
  paginationBtnBackEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
  state,
  RESULT_PER_PAGE,
} from "../common.js";
import { renderJobList } from "./JobList.js";

export const renderPaginationsButton = () => {
  // display back button if we are on page 2 or further
  state.currentPage >= 2
    ? paginationBtnBackEl.classList.remove("pagination__button--hidden")
    : paginationBtnBackEl.classList.add("pagination__button--hidden");

  // display the next button if they are more jobs on next page
  state.searchJobItems.length - state.currentPage * RESULT_PER_PAGE <= 0
    ? paginationBtnNextEl.classList.add("pagination__button--hidden")
    : paginationBtnNextEl.classList.remove("pagination__button--hidden");

  // update page number
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  // unfocus clicked button
  paginationBtnBackEl.blur();
  paginationBtnNextEl.blur();
};

const clickHandler = async (event) => {
  // get the button that was clicked
  const clickedButtonEl = event.target.closest(".pagination__button");

  // stop the function if null
  if (!clickedButtonEl) return;

  // check if intention is next or back
  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;

  // uptdate the current page state
  nextPage ? state.currentPage++ : state.currentPage--;

  // render the pagination button
  renderPaginationsButton();

  // render jobItems for that page
  renderJobList();
};

paginationEl.addEventListener("click", clickHandler);
