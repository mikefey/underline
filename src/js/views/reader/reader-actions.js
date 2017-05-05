import {
  LOAD_BOOK,
  UPDATE_CURRENT_BOOK_DATA,
  UPDATE_BOOK_POSITION_DATA,
  SLIDER_POSITION_CHANGED,
  SLIDER_RELEASED,
} from './reader-constants';


/**
 * Returns a LOAD_BOOK action object
 * @param {String} id - The id of the book to load
 * @return {Object} An action object
 */
const loadBook = (id) => {
  return {
    type: LOAD_BOOK,
    id,
  };
};


/**
 * Returns an UPDATE_CURRENT_BOOK_DATA action object
 * @param {Object} data - An object with key-value pairs of data to update
 * @return {Object} An action object
 */
const updateCurrentBookData = (data) => {
  return {
    type: UPDATE_CURRENT_BOOK_DATA,
    data,
  };
};


/**
 * Returns a UPDATE_BOOK_POSITION_DATA action object
 * @param {String} id - The id of the book to update
 * @param {Object} location - An epubjs location object
 * @return {Object} An action object
 */
const updateBookPositionData = (id, location) => {
  return {
    type: UPDATE_BOOK_POSITION_DATA,
    id,
    location,
  };
};


/**
 * Returns an SLIDER_POSITION_CHANGED action object
 * @param {Number} percentage - The percentage the slider was dragged
 * @return {Object} An action object
 */
const sliderPositionChanged = (percentage) => {
  return {
    type: SLIDER_POSITION_CHANGED,
    percentage,
  };
};


/**
 * Returns an SLIDER_RELEASED action object
 * @param {Number} percentage - The percentage the slider was dragged when it
 * was released
 * @return {Object} An action object
 */
const sliderReleased = (percentage) => {
  return {
    type: SLIDER_RELEASED,
    percentage,
  };
};

export {
  loadBook,
  updateCurrentBookData,
  updateBookPositionData,
  sliderPositionChanged,
  sliderReleased,
};
