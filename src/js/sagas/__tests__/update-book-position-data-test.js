import test from 'ava';
import { call } from 'redux-saga/effects';
import indexedDB from './../../libs/indexeddb/indexeddb';
import {
  updateBookPositionData,
} from './../update-book-position-data';

test('updateBookPositionData saga test', (t) => {
  const action = {
    id: 1,
    location: { data: 'data' },
    page: 1,
    section: 1,
  };

  const generator = updateBookPositionData(action);

  const next = generator.next();
  t.deepEqual(next.value, call(indexedDB.updateItemById,
    action.id,
    {
      current_location: action.location,
    },
    'books',
  ));
});
