import { WINDOW_RESIZED } from './resizer-constants';

/**
 * Returns a CHANGE_WINDOW_SIZE action object
 * @param {Object} size - A JSON Object holding the window dimensions
 * @returns {Object} an event object with a payload
 */
const windowResized = (size) => {
  return {
    type: WINDOW_RESIZED,
    size,
  };
};

export {
  windowResized,
};
