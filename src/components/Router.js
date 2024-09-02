import {
  BASE_API_URL,
  getData,
  jobDetailsContentEl,
  state,
} from "../common.js";
import { renderError } from "./Error.js";
import { renderJobDetails } from "./JobDetails.js";
import { renderJobList } from "./JobList.js";
import { renderSpinner } from "./Spinner.js";

const loadHashChangeHandler = async () => {
  // get id from the URL
  const id = window.location.hash.substring(1);

  // remove the previous job details
  if (id) {
    // remove the active class from previously active job item
    document
      .querySelectorAll(".job-item--active")
      .forEach((jobItemsWithActiveClass) =>
        jobItemsWithActiveClass.classList.remove("job-item--active")
      );
    jobDetailsContentEl.innerHTML = "";

    // remove spinner
    renderSpinner("jobs");

    // fetch job item data modern syntax
    try {
      // Using HELPER / UTILITY Function to fetch data from common.js file
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);

      // extract job data
      const { jobItem } = data;

      // update state
      state.activeJobItem = jobItem;

      //render job list
      renderJobList();

      // remove spinner
      renderSpinner("jobs");

      // render job details
      renderJobDetails(jobItem);
    } catch (error) {
      renderError(error.message), renderSpinner("jobs");
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHashChangeHandler);
window.addEventListener("hashchange", loadHashChangeHandler);
