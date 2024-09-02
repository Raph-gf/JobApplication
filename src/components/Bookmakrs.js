import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";
import { renderJobList } from "./JobList.js";

const clickHandler = (event) => {
  // only continue if bookmark btn is clicked
  if (!event.target.className.includes("bookmark")) return;

  // make bookmark button acitve
  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");

  // update state
  if (
    state.bookmarksJobItems.some(
      (bookmarksJobItems) => bookmarksJobItems.id === state.activeJobItem.id
    )
  ) {
    state.bookmarksJobItems = state.bookmarksJobItems.filter(
      (bookmarksJobItems) => bookmarksJobItems.id !== state.activeJobItem.id
    );
  } else {
    state.bookmarksJobItems.push(state.activeJobItem);
  }

  // persist data with local storage
  localStorage.setItem(
    "bookmarksJobItems",
    JSON.stringify(state.bookmarksJobItems)
  );
  // render job list
  renderJobList();
};

const mouseEnterHandler = () => {
  // make bookmark button look active
  bookmarksBtnEl.classList.add("bookmarks-btn--active");

  // make job list visible
  jobListBookmarksEl.classList.add("job-list--visible");

  // render bookmark job list
  renderJobList("bookmarks");
};

const mouseLeaveHandler = () => {
  // make bookmark button look inactive
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");

  // make job list invisible
  jobListBookmarksEl.classList.remove("job-list--visible");
};

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);
