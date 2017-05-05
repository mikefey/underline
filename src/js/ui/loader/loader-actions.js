import {
  SHOW_LOADER,
  HIDE_LOADER,
} from './loader-constants';


/**
 * Returns a SHOW_LOADER action object
 * @param {String} message - A message to show under the loader
 * @return {Object} An action object
 */
const showLoader = (message) => {
  return {
    type: SHOW_LOADER,
    message,
  };
};


/**
 * Returns a HIDE_LOADER action object
 * @return {Object} An action object
 */
const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};

export {
  showLoader,
  hideLoader,
};
