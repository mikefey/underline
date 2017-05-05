import test from 'ava';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Main from './../Main.jsx';

test('Main component', (t) => {
  const tree = renderToString(
    <Main />,
  );

  t.snapshot(tree);
});
