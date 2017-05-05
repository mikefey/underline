import uuid from 'uuid';
import { put, call } from 'redux-saga/effects';
import indexedDB from 'libs/indexeddb/indexeddb';
import fetchResource from 'libs/fetch-resource/fetch-resource';
import epub from 'libs/epub/epub';
import {
  DOWNLOAD_BOOK_COMPLETE,
  ADD_BOOK_TO_COLLECTION,
} from 'views/collection/collection-constants';
import {
  SHOW_LOADER,
  HIDE_LOADER,
} from 'ui/loader/loader-constants';


/**
 * Unpacks a book's contents
 * @returns {Object} A Redux saga effect
 */
function *unpackBookContents(data) {
  const book = yield call(epub.getBookData, data.file);

  return book;
}


/**
 * Downloads a book file from dropbox
 * @returns {Object} A Redux saga effect
 */
function *fetchBookData(url, responseType) {
  const data = yield call(fetchResource, url, responseType);

  return data;
}


/**
 * Saves book data to indexeddb
 * @param {Object} arrayBuffer - The epub file in arrayBuffer format
 * @returns {Object} A Redux saga effect
 */
function *saveBookData(arrayBuffer) {
  const key = uuid();
  const data = {
    id: key,
    file: arrayBuffer,
    title: '',
    author: '',
    cover_image: '',
    thumbnail: '',
    current_location: {
      start: '',
      percentage: 0,
      end: '',
    },
  };

  const newData = yield call(indexedDB.addItem, data, 'books');

  return newData;
}


/**
 * Saves updated book data with parsed contents to indexeddb
 * @returns {Object} A Redux saga effect
 */
function *updateBookData(data) {
  const book = yield call(indexedDB.updateItemById, data.id, data, 'books');

  return book;
}


/**
 * Dispatches actions to download and save book
 * @returns {undefined} undefined
 */
function *downloadBook(action) {
  try {
    // show preloader
    yield put({ type: SHOW_LOADER, message: 'Downloading Book' });
    // download epub file from DropBox
    const dropboxBookData = yield call(fetchBookData, action.url, 'arrayBuffer');
    // save book data to database
    const bookData = yield call(saveBookData, dropboxBookData);
    // update preloader message
    yield put({ type: SHOW_LOADER, message: 'Unpacking Book' });
    // parse epub contents to get title, cover, etc
    const updatedBookData = yield call(unpackBookContents, bookData);
    // merge new data with original data
    const mergedBookData = Object.assign(bookData, updatedBookData);
    // save updated data
    const savedBookData = yield call(updateBookData, mergedBookData);
    // let the collection store know that that book download is complete
    yield put({ type: DOWNLOAD_BOOK_COMPLETE });
    // send data to store
    yield put({ type: ADD_BOOK_TO_COLLECTION, data: savedBookData });
    // hide preloader
    yield put({ type: HIDE_LOADER });
  } catch (error) {
    yield put({ type: HIDE_LOADER });
  }
}

export {
  downloadBook,
  fetchBookData,
  unpackBookContents,
  saveBookData,
  updateBookData,
};
