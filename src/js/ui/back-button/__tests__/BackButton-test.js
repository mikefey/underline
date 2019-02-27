import test from 'ava';
import React from 'react';
import { renderToString } from 'react-dom/server';

import BackButton from './../BackButton.jsx';

test('BackButton component', (t) => {
  const tree = renderToString(<BackButton link={'/'} />);
  t.snapshot(tree);
});
