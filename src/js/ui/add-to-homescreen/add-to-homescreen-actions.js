import {
  SHOW_ADD_TO_HOMESCREEN,
  HIDE_ADD_TO_HOMESCREEN,
} from './add-to-homescreen-constants';


/**
 * Returns a SHOW_ADD_TO_HOMESCREEN action object
 * @param {String} os - The type of operating system (null, 'iOS' or 'Android')
 * @return {Object} An action object
 */
const showAddToHomescreen = (os) => {
  return {
    type: SHOW_ADD_TO_HOMESCREEN,
    os,
  };
};


/**
 * Returns a HIDE_ADD_TO_HOMESCREEN action object
 * @return {Object} An action object
 */
const hideAddToHomescreen = () => {
  return {
    type: HIDE_ADD_TO_HOMESCREEN,
  };
};

export {
  showAddToHomescreen,
  hideAddToHomescreen,
};
