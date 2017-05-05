import test from 'ava';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Loader from './../Loader.jsx';

const state = {
  show: true,
  message: '',
};

test('Loader component', (t) => {
  const tree = renderToString(<Loader loaderState={state} />);
  t.snapshot(tree);
});
