import test from 'ava';
import {
  dbReady,
} from './../indexeddb-actions';

test('dbReady action', (t) => {
  t.snapshot(dbReady());
});
