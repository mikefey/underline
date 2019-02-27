import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from 'reducers';
import deviceHelper from 'libs/device/device-helper';
import Resizer from 'global/resizer/ResizerContainer.jsx';
import CollectionContainer from 'views/collection/CollectionContainer.jsx';
import ReaderContainer from 'views/reader/ReaderContainer.jsx';
import TableOfContents from 'views/table-of-contents/TableOfContentsContainer.jsx';
import Info from 'views/info/InfoContainer.jsx';
import Loader from 'ui/loader/LoaderContainer.jsx';
import rootSaga from 'sagas/root-saga';
import indexedDB from 'libs/indexeddb/indexeddb';
import { dbReady } from 'libs/indexeddb/indexeddb-actions.js';
import bookSchema from 'schemas/book';
import style from './Main.scss';

const deviceOS = deviceHelper.getMobileOperatingSystem();
const middlewares = [];
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

const store = createStore(
  reducers,
  applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);
indexedDB.init('underline', 1, [bookSchema])
  .then(() => {
    store.dispatch(dbReady());
  })
  .catch((error) => {
    console.log(error);
  });


/**
 * Root component for the app
 */
class Main extends Component {
  /**
   * Renders component
   * @returns {ReactElement} The component
   */
  render() {
    return (
      <Provider store={store}>
        <div className={style.wrapper}>
          <Resizer useScreenDimensions={(deviceOS === 'Android')} />
          <HashRouter>
            <Switch>
              <Route exact path='/' component={CollectionContainer} />
              <Route exact path='/book/:bookId' component={ReaderContainer} />
            </Switch>
          </HashRouter>
          <TableOfContents />
          <Info />
          <Loader />
        </div>
      </Provider>
    );
  }
}

export default Main;
