import test from 'ava';
import {
  SHOW_ADD_TO_HOMESCREEN,
  HIDE_ADD_TO_HOMESCREEN,
} from './../add-to-homescreen-constants';
import addToHomescreenReducer from './../add-to-homescreen-reducer.js';

test('default state', (t) => {
  t.snapshot(addToHomescreenReducer(undefined, {}));
});

test('handles SHOW_ADD_TO_HOMESCREEN', (t) => {
  t.snapshot(addToHomescreenReducer(undefined, {
    type: SHOW_ADD_TO_HOMESCREEN,
    os: 'Android',
  }));
});

test('handles HIDE_ADD_TO_HOMESCREEN', (t) => {
  t.snapshot(addToHomescreenReducer(undefined, { type: HIDE_ADD_TO_HOMESCREEN }));
});
