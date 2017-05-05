import test from 'ava';
import React from 'react';
import { renderToString } from 'react-dom/server';

import AddBooksButton from './../AddBooksButton.jsx';

test('AddBooksButton component', (t) => {
  const collectionState = {
    collection: [],
  };
  const downloadBook = () => {
    return true;
  };

  const tree = renderToString(<AddBooksButton
    collectionState={collectionState}
    downloadBook={downloadBook}
  />);
  t.snapshot(tree);
});
