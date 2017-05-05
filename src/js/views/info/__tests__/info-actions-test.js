import test from 'ava';
import {
  showInfo,
  hideInfo,
} from './../info-actions';

test('showInfo action', (t) => {
  t.snapshot(showInfo());
});

test('hideInfo action', (t) => {
  t.snapshot(hideInfo());
});
