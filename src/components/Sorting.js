import {
  sortingEl,
  sortingBtnRelevantEl,
  sortingBtnRecentEl,
  state,
} from "../common.js";
import { renderJobList } from "./JobList.js";

const clickHandler = (event) => {
  event.preventDefault();
  // get button that was clicked
  const clickedButtonEl = event.target.closest(".sorting__button");

  // stop function if no button was clicked
  if (!clickedButtonEl) return;

  // check if intention is recent or revelant sorting
  const recent = clickedButtonEl.className.includes("--recent") ? true : false;

  // make sorting button (in)active
  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
  }

  // sort job items
  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo; // e.g if a.daysAgo = 10 & b.daysAgo = 5 then b is more recent than a and should be sorted higher
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }
  // render sorted jobList in list
  renderJobList();
};
sortingEl.addEventListener("click", clickHandler);
