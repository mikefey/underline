import test from 'ava';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Collection from './../Collection.jsx';

test('Collection component', (t) => {
  const readerState = {
    currentBookData: null,
    findingBookPosition: false,
  };
  const resizerState = {
    windowSize: {
      width: 1024,
      height: 768,
    },
  };
  const loaderState = {
    show: false,
  };
  const collectionState = {
    collection: [],
  };
  const downloadBook = () => {
    return true;
  };
  const getCollection = () => {
    return true;
  };
  const showInfo = () => {};
  const updateCurrentBookData = () => {};

  const tree = renderToString(<Collection
    loaderState={loaderState}
    collectionState={collectionState}
    downloadBook={downloadBook}
    getCollection={getCollection}
    readerState={readerState}
    resizerState={resizerState}
    showInfo={showInfo}
    updateCurrentBookData={updateCurrentBookData}
  />);

  t.snapshot(tree);
});
