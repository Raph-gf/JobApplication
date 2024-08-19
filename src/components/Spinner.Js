import { spinnerSearchEl, spinnerJobDetailsEl } from "../common.js";

// senior way
export const renderSpinner = (witchSpinner) => {
  const spinnerEl =
    witchSpinner === "search" ? spinnerSearchEl : spinnerJobDetailsEl;
  spinnerEl.classList.toggle("spinner--visible");
};

// newbie way or junior way
// export const renderSpinnerSearch = () => {
//   spinnerSearchEl.classList.add("spinner--visible");
// };
// export const renderSpinnerJobs = () => {
//   spinnerJobDetailsEl.classList.add("spinner--visible");
// };

// export const removeSpinnerSearch = () => {
//   spinnerSearchEl.classList.remove("spinner--visible");
// };

// export const removeSpinnerJobs = () => {
//   spinnerJobDetailsEl.classList.remove("spinner--visible");
// };
