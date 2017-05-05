import test from 'ava';
import {
  SHOW_INFO,
  HIDE_INFO,
} from './../info-constants';
import infoReducer from './../info-reducer.js';

test('default state', (t) => {
  t.snapshot(infoReducer(undefined, {}));
});

test('handles SHOW_INFO', (t) => {
  t.snapshot(infoReducer(undefined, { type: SHOW_INFO }));
});

test('handles HIDE_INFO', (t) => {
  t.snapshot(infoReducer(undefined, { type: HIDE_INFO }));
});
