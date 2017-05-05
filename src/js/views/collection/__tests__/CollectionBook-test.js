import test from 'ava';
import React from 'react';
import { renderToString } from 'react-dom/server';
import CollectionBook from './../CollectionBook.jsx';
import bookFixture from './../../../../../test/fixtures/book';

test('CollectionBook component', (t) => {
  const windowSize = {
    width: 320,
    height: 500,
  };

  const removeButtonClickHandler = () => {};
  const updateCurrentBookData = () => {};

  const tree = renderToString(<CollectionBook
    data={bookFixture}
    windowSize={windowSize}
    removeButtonClickHandler={removeButtonClickHandler}
    updateCurrentBookData={updateCurrentBookData}
  />);

  t.snapshot(tree);
});
