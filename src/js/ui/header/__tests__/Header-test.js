import test from 'ava';
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';

import Header from './../Header.jsx';

test('Header component', (t) => {
  const tree = renderToString(<Header text={'Your books'} />);
  t.snapshot(tree);
});
