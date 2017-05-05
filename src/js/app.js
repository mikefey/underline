import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Main from './views/main/Main.jsx';

(() => {
  const doc = document;
  const appContainer = doc.getElementsByClassName('app-container')[0];

  ReactDOM.render(
    <Main />,
    appContainer,
  );

  if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install();
  }
})();
