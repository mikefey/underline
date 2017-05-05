import test from 'ava';
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';

import BackButton from './../BackButton.jsx';

test('BackButton component', (t) => {
  const tree = renderToString(<BackButton link={'/'} />);
  t.snapshot(tree);
});
