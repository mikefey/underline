import {
  DOWNLOAD_BOOK,
  GET_COLLECTION,
  ADD_BOOK_TO_COLLECTION,
} from './collection-constants';


/**
 * Returns a DOWNLOAD_BOOK action object
 * @param {String} url - The url of the book to download
 * @return {Object} An action object
 */
const downloadBook = (url) => {
  return {
    type: DOWNLOAD_BOOK,
    url,
  };
};


/**
 * Returns a GET_COLLECTION action object
 * @return {Object} An action object
 */
const getCollection = () => {
  return {
    type: GET_COLLECTION,
  };
};


/**
 * Returns an ADD_BOOK_TO_COLLECTION action object
 * @return {Object} An action object
 */
const updateCollection = (data) => {
  return {
    type: ADD_BOOK_TO_COLLECTION,
    data,
  };
};

export { downloadBook, getCollection, updateCollection };
