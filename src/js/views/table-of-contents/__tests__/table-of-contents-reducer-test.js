import test from 'ava';
import {
  UPDATE_TABLE_OF_CONTENTS,
  SHOW_TABLE_OF_CONTENTS,
  HIDE_TABLE_OF_CONTENTS,
} from './../table-of-contents-constants';
import tableOfContentsReducer from './../table-of-contents-reducer.js';

const data = [
  { title: 'item 1', href: 'item-1.html' },
  { title: 'item 2', href: 'item-2.html' },
];

test('default state', (t) => {
  t.snapshot(tableOfContentsReducer(undefined, {}));
});

test('handles UPDATE_TABLE_OF_CONTENTS', (t) => {
  t.snapshot(tableOfContentsReducer(undefined, { type: UPDATE_TABLE_OF_CONTENTS, data }));
});

test('handles SHOW_TABLE_OF_CONTENTS', (t) => {
  t.snapshot(tableOfContentsReducer(undefined, { type: SHOW_TABLE_OF_CONTENTS }));
});

test('handles HIDE_TABLE_OF_CONTENTS', (t) => {
  t.snapshot(tableOfContentsReducer(undefined, { type: HIDE_TABLE_OF_CONTENTS }));
});
