import test from 'ava';
import React from 'react';
import { renderToString } from 'react-dom/server';

import TableOfContents from './../TableOfContents.jsx';

test('TableOfContents component', (t) => {
  const state = {
    data: [
      { label: 'item 1', href: 'item-1.html' },
      { label: 'item 2', href: 'item-2.html' },
    ],
    show: false,
  };
  const hideTableOfContents = () => {};

  const tree = renderToString(
    <TableOfContents
      hideTableOfContents={hideTableOfContents}
      tableOfContentsState={state}
    />,
  );

  t.snapshot(tree);
});
