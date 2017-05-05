import test from 'ava';
import {
  LOAD_BOOK,
  LOAD_BOOK_COMPLETE,
  UPDATE_CURRENT_BOOK_DATA,
  READER_EXITED,
  BOOK_POSITION_DATA_UPDATED,
  SLIDER_RELEASED,
} from './../reader-constants';
import infoReducer from './../reader-reducer.js';
import bookFixture from './../../../../../test/fixtures/book';

test('default state', (t) => {
  t.snapshot(infoReducer(undefined, {}));
});

test('handles LOAD_BOOK', (t) => {
  t.snapshot(infoReducer(undefined, { type: LOAD_BOOK }));
});

test('handles LOAD_BOOK_COMPLETE', (t) => {
  t.snapshot(infoReducer(undefined, { type: LOAD_BOOK_COMPLETE }));
});

test('handles UPDATE_CURRENT_BOOK_DATA', (t) => {
  t.snapshot(infoReducer(undefined, { type: UPDATE_CURRENT_BOOK_DATA, data: bookFixture }));
});

test('handles READER_EXITED', (t) => {
  t.snapshot(infoReducer(undefined, { type: READER_EXITED }));
});

test('handles BOOK_POSITION_DATA_UPDATED', (t) => {
  t.snapshot(infoReducer(
    {
      currentBookData: bookFixture,
    },
    {
      type: BOOK_POSITION_DATA_UPDATED,
      data: { current_location: 0.96 },
    }));
});

test('handles SLIDER_RELEASED', (t) => {
  t.snapshot(infoReducer(undefined, { type: SLIDER_RELEASED, percentage: 0.57 }));
});
