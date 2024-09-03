import {
  jobListSearchEl,
  jobDetailsContentEl,
  BASE_API_URL,
  getData,
  state,
  RESULT_PER_PAGE,
  jobListBookmarksEl,
} from "../common.js";
import { renderError } from "./Error.js";
import { renderJobDetails } from "./JobDetails.js";
import { renderSpinner } from "./Spinner.js";

// -- JOB LIST COMPONENT --

// RENDER JOB LIST
export const renderJobList = (witchJobList = "search") => {
  // determine correct selector for job list
  const jobListEl =
    witchJobList === "search" ? jobListSearchEl : jobListBookmarksEl;

  // remove previous jobs
  jobListEl.innerHTML = "";

  // determine the job list that should be rendered
  let jobItems;
  if (witchJobList === "search") {
    jobItems = state.searchJobItems.slice(
      state.currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,
      state.currentPage * RESULT_PER_PAGE
    );
  } else if (witchJobList === "bookmarks") {
    jobItems = state.bookmarksJobItems;
  }

  // render sorted job list
  jobItems &&
    jobItems.forEach((jobItem) => {
      const newJobItemHtml = `
        <li class="job-item ${
          state.activeJobItem.id === jobItem.id
            ? "job-item--active"
            : " job-item"
        }">
      <a class="job-item__link" href=${jobItem.id}>
          <div class="job-item__badge">${jobItem.badgeLetters}</div>
          <div class="job-item__middle">
              <h3 class="third-heading">${jobItem.title}</h3>
              <p class="job-item__company">${jobItem.company}</p>
              <div class="job-item__extras">
                  <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${
                    jobItem.duration
                  }</p>
                  <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${
                    jobItem.salary
                  }</p>
                  <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${
                    jobItem.location
                  }</p>
              </div>
          </div>
          <div class="job-item__right">
              <i class="fa-solid fa-bookmark job-item__bookmark-icon ${
                state.bookmarksJobItems.some(
                  (bookmarkJobItem) => bookmarkJobItem.id === jobItem.id
                )
                  ? "job-item__bookmark-icon--bookmarked"
                  : ""
              }"></i>
              <time class="job-item__time">${jobItem.daysAgo}d</time>
          </div>
      </a>
  </li>`;
      jobListEl.insertAdjacentHTML("beforeend", newJobItemHtml);
    });
};

const clickHandler = async (event) => {
  // prevent default behavior
  event.preventDefault();

  // get the job items that was clicked
  const jobItemEl = event.target.closest(".job-item");

  // remove the active class from previously active job item
  document
    .querySelectorAll(".job-item--active")
    .forEach((jobItemsWithActiveClass) =>
      jobItemsWithActiveClass.classList.remove("job-item--active")
    );

  // second method to remove the active class from
  // const activeClass = document.querySelector(".job-item--active");
  // if (activeClass) {
  //   activeClass.classList.remove("job-item--active");
  // }

  //thrid method to remove the active class from
  // document.querySelector(".job-item--active") &&
  //   document
  //     .querySelector(".job-item--active")
  //     .classList.remove("job-item--active");

  // empty job details section
  jobDetailsContentEl.innerHTML = "";

  // display spinner
  renderSpinner("jobs");

  // get job id
  const id = jobItemEl.children[0].getAttribute("href");

  // add the id to the URL
  history.pushState(null, "", `/#${id}`);

  // update state of activeJobItem
  const allJobItems = [...state.searchJobItems, ...state.bookmarksJobItems];
  state.activeJobItem = allJobItems.find((jobItem) => jobItem.id === +id);

  // render job list
  renderJobList();

  // fetch job item data modern syntax
  try {
    // Using HELPER / UTILITY Function to fetch data from common.js file
    const data = await getData(`${BASE_API_URL}/jobs/${id}`);

    // extract job data
    const { jobItem } = data;

    // remove spinner
    renderSpinner("jobs");

    // render job details
    renderJobDetails(jobItem);
  } catch (error) {
    renderError(error.message), renderSpinner("jobs");
  }
  // fetch(`${BASE_API_URL}//jobs/${id}`)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(
  //         "Ressourse issue (e.g ressource does not exist) or server issues"
  //       );
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     // extract job data
  //     const { jobItem } = data;
  //     console.log(jobItem);

  //     // remove spinner
  //     renderSpinner("jobs");

  //     // render job details
  //     renderJobDetails(jobItem);
  //   })
  //   .catch((error) => {
  //     renderError(error.message), renderSpinner("jobs");
  //   });
};

jobListSearchEl.addEventListener("click", clickHandler);
jobListBookmarksEl.addEventListener("click", clickHandler);
