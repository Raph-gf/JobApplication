import { DEFAULT_DISPLAY_TIME, errorEl, errorTextEl } from "../common.js";

export const renderError = (message = "Ooops something went wrong") => {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, DEFAULT_DISPLAY_TIME);
  return;
};
