import test from 'ava';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Reader from './../Reader.jsx';

test('Reader component', (t) => {
  const readerState = {
    currentBookData: null,
    findingBookPosition: false,
  };

  const loaderState = {
    show: false,
    message: '',
  };

  const tableOfContentsState = {
    clickedButtonIndex: null,
    data: null,
    show: false,
  };

  const resizerState = {
    windowSize: {
      width: 1024,
      height: 768,
    },
  };

  const hideLoader = () => {};
  const showLoader = () => {};
  const loadBook = () => {};
  const showTableOfContents = () => {};
  const sliderReleased = () => {};
  const updateBookPositionData = () => {};
  const updateTableOfContents = () => {};
  const params = {};

  const tree = renderToString(
    <Reader
      readerState={readerState}
      loaderState={loaderState}
      tableOfContentsState={tableOfContentsState}
      hideLoader={hideLoader}
      showLoader={showLoader}
      loadBook={loadBook}
      params={params}
      resizerState={resizerState}
      showTableOfContents={showTableOfContents}
      sliderReleased={sliderReleased}
      updateBookPositionData={updateBookPositionData}
      updateTableOfContents={updateTableOfContents}
    />,
  );

  t.snapshot(tree);
});
