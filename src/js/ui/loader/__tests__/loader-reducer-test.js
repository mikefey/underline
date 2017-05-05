import test from 'ava';
import {
  SHOW_LOADER,
  HIDE_LOADER,
} from './../loader-constants';
import loaderReducer from './../loader-reducer.js';

test('default state', (t) => {
  t.snapshot(loaderReducer(undefined, {}));
});

test('handles SHOW_LOADER', (t) => {
  t.snapshot(loaderReducer(undefined, {
    type: SHOW_LOADER,
    message: 'Loading',
  }));
});

test('handles HIDE_LOADER', (t) => {
  t.snapshot(loaderReducer(undefined, { type: HIDE_LOADER }));
});
