import { put, call } from 'redux-saga/effects';
import indexedDB from 'libs/indexeddb/indexeddb';
import {
  UPDATE_COLLECTION,
} from 'views/collection/collection-constants';
import {
  SHOW_LOADER,
  HIDE_LOADER,
} from 'ui/loader/loader-constants';


/**
 * Gets all books from database
 * @returns {Object} A Redux saga effect
 */
function *getAllBookData() {
  const allBooks = yield call(indexedDB.getAll, 'books');

  return allBooks;
}


/**
 * Dispatches actions to get all books from the database and update the store
 * @returns {undefined} undefined
 */
function *getCollection() {
  try {
    // load all books from the database
    const bookData = yield call(getAllBookData);
    // show preloader
    yield put({ type: SHOW_LOADER, message: 'Loading Books' });
    // update collection with book data
    yield put({ type: UPDATE_COLLECTION, data: bookData });
    // hide preloader
    yield put({ type: HIDE_LOADER });
  } catch (error) {
    yield put({ type: HIDE_LOADER });
  }
}

export {
  getCollection,
  getAllBookData,
};
