import test from 'ava';
import { put, call } from 'redux-saga/effects';
import {
  DOWNLOAD_BOOK,
  DOWNLOAD_BOOK_COMPLETE,
  ADD_BOOK_TO_COLLECTION,
} from './../../views/collection/collection-constants';
import {
  SHOW_LOADER,
  HIDE_LOADER,
} from './../../ui/loader/loader-constants';
import {
  downloadBook,
  fetchBookData,
  saveBookData,
  unpackBookContents,
  updateBookData,
} from './../download-book';
import bookFixture from './../../../../test/fixtures/book';

const bookData = [{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }];

test('downloadBook saga test', (t) => {
  const action = { type: DOWNLOAD_BOOK, url: 'path/to/book/file' };
  const dropboxBookData = { data: 'arrayBuffer' };
  const updatedBookData = Object.assign({ file: 'arrayBuffer' }, bookFixture);
  const generator = downloadBook(action);

  let next = generator.next();
  t.deepEqual(next.value, put({ type: SHOW_LOADER, message: 'Downloading Book' }));

  next = generator.next(fetchBookData, action.url, 'arrayBuffer');
  t.deepEqual(next.value, call(fetchBookData, action.url, 'arrayBuffer'));

  next = generator.next(dropboxBookData);
  t.deepEqual(next.value, call(saveBookData, dropboxBookData));

  next = generator.next(bookFixture);
  t.deepEqual(next.value, put({ type: SHOW_LOADER, message: 'Unpacking Book' }));

  next = generator.next();
  t.deepEqual(next.value, call(unpackBookContents, bookFixture));

  next = generator.next(updatedBookData);
  t.deepEqual(next.value, call(updateBookData, updatedBookData));

  next = generator.next(bookData);
  t.deepEqual(next.value, put({ type: DOWNLOAD_BOOK_COMPLETE }));

  next = generator.next();
  t.deepEqual(next.value, put({ type: ADD_BOOK_TO_COLLECTION, data: bookData }));

  next = generator.next();
  t.deepEqual(next.value, put({ type: HIDE_LOADER }));

  next = generator.next();
  t.is(next.done, true);
});
