import test from 'ava';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Info from './../Info.jsx';

test('Info component', (t) => {
  const infoState = {
    show: true,
  };
  const hideInfo = () => {};

  const tree = renderToString(<Info
    infoState={infoState}
    hideInfo={hideInfo}
  />);

  t.snapshot(tree);
});
