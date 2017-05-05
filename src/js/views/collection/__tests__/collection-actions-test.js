import test from 'ava';
import {
  downloadBook,
  getCollection,
  updateCollection,
} from './../collection-actions';

test('downloadBook action', (t) => {
  t.snapshot(downloadBook('/path/to/book'));
});

test('getCollection action', (t) => {
  t.snapshot(getCollection());
});

test('updateCollection action', (t) => {
  const data = { id: '12345', title: 'A New Book' };
  t.snapshot(updateCollection(data));
});
