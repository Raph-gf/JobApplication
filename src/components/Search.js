import {
  searchFormEl,
  searchInputEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
  getData,
  state,
} from "../common.js";
import { renderError } from "./Error.js";
import { renderJobList } from "./JobList.js";
import { renderSpinner } from "./Spinner.js";

// -- SEARCH COMPONENT --

const submitHandler = async (event) => {
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

  // fetch search result modern syntax
  try {
    // Using HELPER / UTILITY Function to fetch data from common.js file
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    // extract job items
    const { jobItems } = data;

    //update state
    state.searchJobItems = jobItems;

    // remove spinner
    renderSpinner("search");

    // render  number of results
    numberEl.textContent = jobItems.length;

    // render job items in the job list
    renderJobList();
  } catch (error) {
    renderSpinner("search"), renderError(error.message);
  }

  // fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(
  //         "Ressourse issue (e.g ressource does not exist) or server issues"
  //       );
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     const { jobItems } = data;
  //     console.log(jobItems);

  //     // remove spinner
  //     renderSpinner("search");

  //     // render  number of results
  //     numberEl.textContent = jobItems.length;

  //     // render job items in the job list
  //     renderJobList(jobItems);
  //   })

  //   // network problems or others error (e.g ressource does not exist or trying to parse something that's not JSON as JSON)
  //   .catch((error) => {
  //     renderSpinner("search"), renderError(error.message);
  //   });
};

searchFormEl.addEventListener("submit", submitHandler);
