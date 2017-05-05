import {
  SHOW_INFO,
  HIDE_INFO,
} from './info-constants';


/**
 * Returns a SHOW_INFO action object
 * @return {Object} An action object
 */
const showInfo = () => {
  return {
    type: SHOW_INFO,
  };
};


/**
 * Returns a HIDE_INFO action object
 * @return {Object} An action object
 */
const hideInfo = () => {
  return {
    type: HIDE_INFO,
  };
};

export {
  showInfo,
  hideInfo,
};
