import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Main from './views/main/Main.jsx';

(() => {
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const doc = document;
  const appContainer = doc.getElementsByClassName('app-container')[0];

  ReactDOM.render(
    <Main />,
    appContainer,
  );

  // Only install service worker in production and don't install
  // it on iOS because it wil cause the DropBox chooser to fail.
  if (process.env.NODE_ENV === 'production' && !iOS) {
    OfflinePluginRuntime.install();
  }
})();
