import { combineReducers } from 'redux';
import resizerReducer from 'global/resizer/resizer-reducer';
import loaderReducer from 'ui/loader/loader-reducer';
import collectionReducer from 'views/collection/collection-reducer';
import readerReducer from 'views/reader/reader-reducer';
import tableOfContentsReducer from 'views/table-of-contents/table-of-contents-reducer';
import infoReducer from 'views/info/info-reducer';
import addToHomescreenReducer from 'ui/add-to-homescreen/add-to-homescreen-reducer';

const reducer = combineReducers({
  resizerState: resizerReducer,
  collectionState: collectionReducer,
  loaderState: loaderReducer,
  readerState: readerReducer,
  tableOfContentsState: tableOfContentsReducer,
  infoState: infoReducer,
  addToHomescreenState: addToHomescreenReducer,
});

export default reducer;
