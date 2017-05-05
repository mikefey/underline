import {
  DB_READY,
} from 'libs/indexeddb/indexeddb-constants';
import {
  DOWNLOAD_BOOK,
  DOWNLOAD_BOOK_COMPLETE,
  GET_COLLECTION,
  GET_COLLECTION_COMPLETE,
  ADD_BOOK_TO_COLLECTION,
  UPDATE_COLLECTION,
} from './collection-constants';

const initialState = {
  collection: [],
  dbReady: false,
  downloadingBook: false,
  gettingCollection: false,
  initialCollectionLoaded: false,
};


const sortCollection = (collection) => {
  return [...collection].sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });
};


/**
 * Updates the state based on the action type
 * @param {Object} state - The current loader state
 * @param {Object} action - A dispatched action
 * @return {Object} The updated state
 */
export default function reducer(state = initialState, action = {}) {
  let newCollection;
  let sortedCollection = [];

  switch (action.type) {
    case DB_READY:
      return {
        ...state,
        dbReady: true,
      };

    case DOWNLOAD_BOOK:
      return {
        ...state,
        downloadingBook: true,
      };

    case DOWNLOAD_BOOK_COMPLETE:
      return {
        ...state,
        downloadingBook: false,
      };

    case GET_COLLECTION:
      return {
        ...state,
        gettingCollection: true,
      };

    case GET_COLLECTION_COMPLETE:
      return {
        ...state,
        gettingCollection: false,
      };

    case UPDATE_COLLECTION:
      newCollection = action.data;
      if (newCollection) {
        sortedCollection = sortCollection(newCollection);
      }

      return {
        ...state,
        collection: sortedCollection,
        initialCollectionLoaded: true,
      };

    case ADD_BOOK_TO_COLLECTION:
      newCollection = state.collection.concat(action.data);
      sortedCollection = sortCollection(newCollection);

      return {
        ...state,
        collection: sortedCollection,
      };

    default:
      return state;
  }
}
