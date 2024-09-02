import { state } from "../common.js";

const storedJobItems = localStorage.getItem("bookmarksJobItems");
if (storedJobItems) {
  state.bookmarksJobItems = JSON.parse(storedJobItems);
}
