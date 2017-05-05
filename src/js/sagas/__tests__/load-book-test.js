import test from 'ava';
import { put, call } from 'redux-saga/effects';
import {
  LOAD_BOOK,
  LOAD_BOOK_COMPLETE,
  UPDATE_CURRENT_BOOK_DATA,
} from './../../views/reader/reader-constants';
import {
  loadBook,
  getBookDataById,
  unpackBookContents,
} from './../load-book';

test('loadBook saga test', (t) => {
  const generator = loadBook({ type: LOAD_BOOK, id: 1 });

  let next = generator.next();
  t.deepEqual(next.value, call(getBookDataById, 1));

  next = generator.next({ file: 'arrayBuffer' });
  t.deepEqual(next.value, call(unpackBookContents, 'arrayBuffer'));

  next = generator.next({ data: '12345' });
  t.deepEqual(next.value, put({ type: UPDATE_CURRENT_BOOK_DATA,
    data: {
      current_book_instance: {
        data: '12345',
      },
      file: 'arrayBuffer',
    },
  }));

  next = generator.next();
  t.deepEqual(next.value, put({ type: LOAD_BOOK_COMPLETE }));
});
