import test from 'ava';
import {
  DB_READY,
} from './../../../libs/indexeddb/indexeddb-constants';
import {
  DOWNLOAD_BOOK,
  DOWNLOAD_BOOK_COMPLETE,
  GET_COLLECTION,
  GET_COLLECTION_COMPLETE,
  ADD_BOOK_TO_COLLECTION,
  UPDATE_COLLECTION,
} from './../collection-constants';
import collectionReducer from './../collection-reducer.js';

test('default state', (t) => {
  t.snapshot(collectionReducer(undefined, {}));
});

test('handles DB_READY', (t) => {
  t.snapshot(collectionReducer(undefined, { type: DB_READY }));
});

test('handles DOWNLOAD_BOOK', (t) => {
  t.snapshot(collectionReducer(undefined, { type: DOWNLOAD_BOOK }));
});

test('handles DOWNLOAD_BOOK_COMPLETE', (t) => {
  t.snapshot(collectionReducer(undefined, { type: DOWNLOAD_BOOK_COMPLETE }));
});

test('handles GET_COLLECTION', (t) => {
  t.snapshot(collectionReducer(undefined, { type: GET_COLLECTION }));
});

test('handles GET_COLLECTION_COMPLETE', (t) => {
  t.snapshot(collectionReducer(undefined, { type: GET_COLLECTION_COMPLETE }));
});

test('handles UPDATE_COLLECTION', (t) => {
  t.snapshot(collectionReducer(undefined, {
    type: UPDATE_COLLECTION,
    data: [{ id: '1', title: 'Book 1' }, { id: '2', title: 'Book 2' }],
  }));
});

test('handles ADD_BOOK_TO_COLLECTION', (t) => {
  t.snapshot(collectionReducer(undefined, {
    type: ADD_BOOK_TO_COLLECTION,
    data: [{ id: '1', title: 'Book 1' }, { id: '2', title: 'Book 2' }],
  }));
});
