import test from 'ava';
import {
  loadBook,
  updateCurrentBookData,
  updateBookPositionData,
  sliderPositionChanged,
  sliderReleased,
} from './../reader-actions';
import bookFixture from './../../../../../test/fixtures/book';

test('loadBook action', (t) => {
  t.snapshot(loadBook(1));
});

test('updateCurrentBookData action', (t) => {
  t.snapshot(updateCurrentBookData(bookFixture));
});

test('updateBookPositionData action', (t) => {
  t.snapshot(updateBookPositionData(1, { percentage: 0.76 }));
});

test('sliderPositionChanged action', (t) => {
  t.snapshot(sliderPositionChanged(0.56));
});

test('sliderReleased action', (t) => {
  t.snapshot(sliderReleased(0.65));
});
