import {
  searchFormEl,
  searchInputEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
} from "../common.js";
import { renderError } from "./Error.js";
import { renderJobList } from "./JobList.js";
import { renderSpinner } from "./Spinner.js";

// -- SEARCH COMPONENT --

const submitHandler = (event) => {
  // prevent default behavior
  event.preventDefault();

  // get search text
  const searchText = searchInputEl.value;
  console.log(event);

  // input validation (regular expression)
  const forbiddenPatern = /[0-9]/;
  const paternMatch = forbiddenPatern.test(searchText);
  if (paternMatch) {
    renderError("Your search may not contain numbers");
    return;
  }

  // blur search bar
  searchInputEl.blur();

  // empty job list
  jobListSearchEl.innerHTML = "";

  // display spinner
  renderSpinner("search");

  // fetch search result
  fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    .then((response) => {
      if (!response.ok) {
        console.log("something went wrong");
        return;
      }
      return response.json();
    })
    .then((data) => {
      const { jobItems } = data;
      console.log(jobItems);

      // remove spinner
      renderSpinner("search");

      // render  number of results
      numberEl.textContent = jobItems.length;

      // render job items in the job list
      renderJobList();
    })
    .catch((error) => console.log(error));
};

searchFormEl.addEventListener("submit", submitHandler);
