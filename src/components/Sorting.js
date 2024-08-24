import {
  sortingEl,
  sortingBtnRelevantEl,
  sortingBtnRecentEl,
} from "../common.js";

const clickHandler = (event) => {
  event.preventDefault();
  // get button that was clicked
  const clickedButtonEl = event.target.closest(".sorting__button");
  console.log(sortingEl);

  // stop function if no button was clicked
  if (!clickedButtonEl) return;

  // check if intention is recent or revelant sorting
  const recent = clickedButtonEl.className.includes("--recent") ? true : false;
  // sort job items
  if (recent) {
  } else {
  }
};
sortingEl.addEventListener("click", clickHandler);
