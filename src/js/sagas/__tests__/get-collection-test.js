import test from 'ava';
import { put, call } from 'redux-saga/effects';
import {
  UPDATE_COLLECTION,
} from './../../views/collection/collection-constants';
import {
  SHOW_LOADER,
  HIDE_LOADER,
} from './../../ui/loader/loader-constants';

import {
  getCollection,
  getAllBookData,
} from './../get-collection';

const bookData = [{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }];

test('getCollection saga test', (t) => {
  const generator = getCollection();

  let next = generator.next();
  t.deepEqual(next.value, call(getAllBookData));

  next = generator.next(bookData);
  t.deepEqual(next.value, put({ type: SHOW_LOADER, message: 'Loading Books' }));

  next = generator.next();
  t.deepEqual(next.value, put({ type: UPDATE_COLLECTION, data: bookData }));

  next = generator.next();
  t.deepEqual(next.value, put({ type: HIDE_LOADER }));
});
