import test from 'ava';
import {
  updateTableOfContents,
  showTableOfContents,
  hideTableOfContents,
} from './../table-of-contents-actions';

const data = [
  { title: 'item 1', href: 'item-1.html' },
  { title: 'item 2', href: 'item-2.html' },
];

test('updateTableOfContents action', (t) => {
  t.snapshot(updateTableOfContents(data));
});

test('showTableOfContents action', (t) => {
  t.snapshot(showTableOfContents());
});

test('hideTableOfContents action', (t) => {
  t.snapshot(hideTableOfContents(data));
});
