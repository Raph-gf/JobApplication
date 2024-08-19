import {
  jobListSearchEl,
  jobDetailsContentEl,
  BASE_API_URL,
} from "../common.js";
import { renderSpinner } from "./Spinner.js";

// -- JOB LIST COMPONENT --

// RENDER JOB LSIT
export const renderJobList = (jobItems) => {
  jobItems.slice(0, 7).forEach((jobItem) => {
    const newJobItemHtml = `
        <li class="job-item">
      <a class="job-item__link" href=${jobItem.id}>
          <div class="job-item__badge">${jobItem.badgeLetters}</div>
          <div class="job-item__middle">
              <h3 class="third-heading">${jobItem.title}</h3>
              <p class="job-item__company">${jobItem.company}</p>
              <div class="job-item__extras">
                  <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                  <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                  <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
              </div>
          </div>
          <div class="job-item__right">
              <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
              <time class="job-item__time">${jobItem.daysAgo}d</time>
          </div>
      </a>
  </li>`;
    jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHtml);
  });
};

const clickHandler = (event) => {
  // prevent default behavior
  event.preventDefault();

  // get the job items that was clicked
  const jobItemEl = event.target.closest(".job-item");
  console.log(jobItemEl);

  // remove the active class from previously active job item
  document
    .querySelector(".job-item--active")
    ?.classList.remove("job-item--active");

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

  // add active class
  jobItemEl.classList.add("job-item--active");

  // empty job details section
  jobDetailsContentEl.innerHTML = "";

  // display spinner
  renderSpinner("jobs");

  // get job id
  const id = jobItemEl.children[0].getAttribute("href");
  console.log(id);

  // fetch job item data
  fetch(`${BASE_API_URL}/jobs/${id}`)
    .then((response) => {
      if (!response.ok) {
        console.log("something went wrong");
        return;
      }
      return response.json();
    })
    .then((data) => {
      // extract job data
      const { jobItem } = data;
      console.log(jobItem);

      // remove spinner
      renderSpinner("jobs");

      // render job details
      const jobDetailHtml = `<img src=${
        jobItem.coverImgURL
      } alt="#" class="job-details__cover-img">
  
  <a class="apply-btn" href=${
    jobItem.companyURL
  } target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>
  
  <section class="job-info">
      <div class="job-info__left">
          <div class="job-info__badge">${jobItem.badgeLetters}</div>
          <div class="job-info__below-badge">
              <time class="job-info__time">${jobItem.daysAgo}</time>
              <button class="job-info__bookmark-btn">
                  <i class="fa-solid fa-bookmark job-info__bookmark-icon"></i>
              </button>
          </div>
      </div>
      <div class="job-info__right">
          <h2 class="second-heading">${jobItem.title}</h2>
          <p class="job-info__company">${jobItem.company}s</p>
          <p class="job-info__description">${jobItem.description}.</p>
          <div class="job-info__extras">
              <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i>${
                jobItem.duration
              }</p>
              <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i>${
                jobItem.salary
              }</p>
              <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i>${
                jobItem.location
              }</p>
          </div>
      </div>
  </section>
  
  <div class="job-details__other">
      <section class="qualifications">
          <div class="qualifications__left">
              <h4 class="fourth-heading">Qualifications</h4>
              <p class="qualifications__sub-text">Other qualifications may apply</p>
          </div>
          <ul class="qualifications__list">
          ${jobItem.qualifications
            .map(
              (qualificationText) =>
                `<li class="qualifications__item">${qualificationText}</li>`
            )
            .join(" ")}
          </ul>
      </section>
  
      <section class="reviews">
          <div class="reviews__left">
              <h4 class="fourth-heading">Company reviews</h4>
              <p class="reviews__sub-text">Recent things people are saying</p>
          </div>
          <ul class="reviews__list">
          ${jobItem.reviews
            .map(
              (reviewsText) => `<li class="reviews__item">${reviewsText}</li>`
            )
            .join(" ")}
              
          </ul>
      </section>
  </div>
  
  <footer class="job-details__footer">
      <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
  </footer>`;

      jobDetailsContentEl.innerHTML = jobDetailHtml;
    })
    .catch((error) => console.log(error));
};

jobListSearchEl.addEventListener("click", clickHandler);
