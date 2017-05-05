import { put, call } from 'redux-saga/effects';
import indexedDB from 'libs/indexeddb/indexeddb';
import epub from 'libs/epub/epub';
import {
  LOAD_BOOK_COMPLETE,
  UPDATE_CURRENT_BOOK_DATA,
} from 'views/reader/reader-constants';


/**
 * Gets a book from the database by id
 * @returns {Object} A Redux saga effect
 */
function *getBookDataById(id) {
  const currentBookData = yield call(indexedDB.getItemById, id, 'books');

  return currentBookData;
}


/**
 * Unpacks the book's contents
 * @returns {Object} A Redux saga effect
 */
function *unpackBookContents(data) {
  const book = yield call(epub.loadBook, data);

  return book;
}


/**
 * Dispatches actions to load a books from the database and update the store
 * @returns {undefined} undefined
 */
function *loadBook(action) {
  try {
    // get current book data from DB
    const currentBookModel = yield call(getBookDataById, action.id);
    // get current book data from DB
    const bookInstance = yield call(unpackBookContents, currentBookModel.file);
    // create an object holding the data
    const bookData = Object.assign(currentBookModel, { current_book_instance: bookInstance });
    // send the current book data to the reader store
    yield put({ type: UPDATE_CURRENT_BOOK_DATA, data: bookData });
    // let the reader store know that that book is loaded
    yield put({ type: LOAD_BOOK_COMPLETE });
  } catch (error) {
    console.log(error);
  }
}

export {
  loadBook,
  getBookDataById,
  unpackBookContents,
};
