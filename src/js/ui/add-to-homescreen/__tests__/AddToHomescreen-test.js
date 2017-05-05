import test from 'ava';
import React from 'react';
import { renderToString } from 'react-dom/server';

import AddToHomescreen from './../AddToHomescreen.jsx';

const state = {
  show: true,
  os: 'iOS',
};

test('AddToHomescreen component', (t) => {
  const hideAddToHomescreen = () => {};
  const tree = renderToString(
    <AddToHomescreen
      addToHomescreenState={state}
      hideAddToHomescreen={hideAddToHomescreen}
    />,
  );
  t.snapshot(tree);
});
