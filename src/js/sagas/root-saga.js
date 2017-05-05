import {
  DOWNLOAD_BOOK,
  GET_COLLECTION,
} from 'views/collection/collection-constants';
import {
  LOAD_BOOK,
  UPDATE_BOOK_POSITION_DATA,
} from 'views/reader/reader-constants';
import { fork, takeEvery } from 'redux-saga/effects';
import { downloadBook } from './download-book';
import { getCollection } from './get-collection';
import { loadBook } from './load-book';
import { updateBookPositionData } from './update-book-position-data.js';


/**
 * Sets up all sagas to listen for actions
 * @returns {undefined} undefined
 */
function *rootSaga() {
  yield [
    takeEvery(DOWNLOAD_BOOK, downloadBook),
    takeEvery(GET_COLLECTION, getCollection),
    takeEvery(LOAD_BOOK, loadBook),
    takeEvery(UPDATE_BOOK_POSITION_DATA, updateBookPositionData),
    fork(getCollection),
  ];
}

export default rootSaga;
